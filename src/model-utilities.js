// Provide values of fifths
const _fifthsValues = {
  '^^C': 14,
  '^^F': 13,
  '^B': 12,
  '^E': 11,
  '^A': 10,
  '^D': 9,
  '^G': 8,
  '^C': 7,
  '^F': 6,
  '=B': 5,
  '=E': 4,
  '=A': 3,
  '=D': 2,
  '=G': 1,
  '=C': 0,
  '=F': -1,
  '_B': -2,
  '_E': -3,
  '_A': -4,
  '_D': -5,
  '_G': -6,
  '_C': -7,
  '_F': -8
};

// Set the direction up/down of a tone object transposition
const _transposeUp = (fifthsValue, transposeFifthsValue) => {
  const values = [0, 4, 1, 5, 2, 6, 3];
  const val1 = values[((fifthsValue % 7) + 7) % 7];
  const val2 = values[((transposeFifthsValue % 7) + 7) % 7];
  return (val1 + val2) > 6 ? 1 : 0;
};

//
const _getModelKeyValue = modelKey => {
  switch (modelKey) {
    case 'E':
    case 'C#m':
      return _fifthsValues['=E'];
    case 'A':
    case 'F#m':
      return _fifthsValues['=A'];
    case 'D':
    case 'Bm':
      return _fifthsValues['=D'];
    case 'G':
    case 'Em':
      return _fifthsValues['=G'];
    case 'C':
    case 'Am':
      return _fifthsValues['=C'];
    case 'F':
    case 'Dm':
      return _fifthsValues['=F'];
    case 'Bb':
    case 'Gm':
      return _fifthsValues._B;
    case 'Eb':
    case 'Cm':
      return _fifthsValues._E;
    case 'Ab':
    case 'Fm':
      return _fifthsValues._A;
    default:
      return 0;
  }
};

// Create a tone object from a model tone: [sign][tone][octave][length][:force]
const _createToneObject = toneSymbol => {
  const regex = /^(\^}^|\^|=|_|__)([CDEFGAB])(\d)(\d):?(\w+)?$/;
  const match = toneSymbol.match(regex);
  const toneObj = {};
  const [, sign, tone, octave, length, additionals] = match;
  toneObj.fifthsValue = _fifthsValues[`${sign}${tone}`];
  toneObj.octave = parseInt(octave, 10) || 4;
  toneObj.length = parseInt(length, 10) || 2;
  toneObj.force = !!additionals;
  return toneObj;
};

// Modifies voices of a model in according to the modeltemplate properties
const getVoices = (options, modelVoices) => {
  let modelToneObjects = [[], [], []];
  // set model key 
  const fifthsValueToTranspose = _getModelKeyValue(options.modelKey);
  // Modify toneObjects
  for (let voicesIndex = 0; voicesIndex < modelVoices.length; voicesIndex += 1) {
    const voice = modelVoices[voicesIndex];
    for (let vIndex = 0; vIndex < voice.length; vIndex += 1) {
      const toneObj = _createToneObject(voice[vIndex]);
      const transposeUpValue = _transposeUp(toneObj.fifthsValue, fifthsValueToTranspose);
      toneObj.octave += transposeUpValue;
      toneObj.fifthsValue += fifthsValueToTranspose;
      modelToneObjects[voicesIndex].push(toneObj);
    }    
  }
  // voice change 
  modelToneObjects = options.voiceArrangement.map(index => modelToneObjects[index - 1]);
  // octave transpositions
  for (let index = 0; index < modelToneObjects.length; index += 1) {
    const voice = modelToneObjects[index];
    voice.forEach(obj => {
      obj.octave += options.transposeValues[index];
    });
  }
  return modelToneObjects;
};

// Convert MeasureSign to defaultLength 
function convertMeasureSignToDefaultLength(measureSign) {
  switch (measureSign) {      
    case '2/4':
    case '3/4':
    case 'C':   
      return '1/8';
    case '3/8':
    case '6/8':
      return '1/16';
    case '3/2':
      return '1/4';
    default:
      return '1/4';
  }
}

// Divide abc voices for display
const divideVoices = (abcVoices, barsPerLine) => {
  const result = [[], [], []];
  const newAbcVoices = [[], [], []];
  abcVoices.forEach((voice, index) => {
    const parts = voice.split(' | '); 
    for (let i = 0; i < parts.length; i += barsPerLine) {
      result[index].push(parts.slice(i, i + barsPerLine));    
    }
  });
  result.forEach((voiceArr, index) => {
    let abc = '';
    for (let i = 0; i < voiceArr.length; i += 1) {
      abc += voiceArr[i].join(' | ');
      abc += ' | ';
      abc += i !== voiceArr.length - 1 ? '\n' : '';
      newAbcVoices[index] = abc;
    }
  });
  return newAbcVoices;
};

// Provide an array of arrays with abc tone symbols ob a measure
const _splitVoiceAbcInMeasures = voice => {
  return voice.reduce((acc, item) => {
    if (item === '|') {
      acc.push([]);
    } else {
      if (acc.length === 0) {
        acc.push([]);
      }
      acc[acc.length - 1].push(item);
    }
    return acc;
  }, []);
};

// Restore a model voice with measure signs
const _combineAbcMeasuresToVoice = measures => {
  return measures.flatMap((measure, index) => {
    return index > 0 ? ['|', ...measure] : measure;
  });
};

// Add an safety sign ('=') to an abcTone where applicable
const _addSafetySigns = (abcTones, matchTone, hasSign) => {
  for (let i = 1; i < abcTones.length; i += 1) {
    if (abcTones[i].startsWith(matchTone) && hasSign) {
      abcTones[i] = `=${abcTones[i]}`;
    } 
  }
};

// Set an safty natural sign ('=') between corresponding abc signs between upper voices
const addCrossVoicesSaftySigns = voices => {
  const abcTones = /[ABCDEFG]/;
  const [voice1Measures, voice2Measures] = [
    _splitVoiceAbcInMeasures(voices[0]),
    _splitVoiceAbcInMeasures(voices[1]),
  ];
  if (voice1Measures.length !== voice2Measures.length) { 
    return voices;
  };
  voice1Measures.forEach((abcToneArr1, index) => {
    const abcToneArr2 = voice2Measures[index];
    if (abcToneArr1.length > 1 && abcToneArr2.length > 1) {
      const tone1 = (abcToneArr1[0].match(abcTones) || [])[0];
      const tone2 = (abcToneArr2[0].match(abcTones) || [])[0];
      const tone1HasSign = abcToneArr1[0].startsWith('^') || abcToneArr1[0].startsWith('_');
      const tone2HasSign = abcToneArr2[0].startsWith('^') || abcToneArr2[0].startsWith('_');
      _addSafetySigns(abcToneArr2, tone1, tone1HasSign);
      _addSafetySigns(abcToneArr1, tone2, tone2HasSign);
    }
  });
  return [_combineAbcMeasuresToVoice(voice1Measures), _combineAbcMeasuresToVoice(voice2Measures)];
};

// Recognizes two identical pitches despite the omission of a redundant sign.
const _comparewithoutRedundantSigns = (str1, str2) => {
  const sign = str1.match(/^[_^]+/);
  if(sign) {
    return str1 === `${sign}${str2}`;
  } 
  return false;
};

const replaceDoubleValues = voice => {
  const measures = _splitVoiceAbcInMeasures(voice);
  // console.log('measures', measures)
  for (let index = 1; index < measures.length; index += 1) {
    const lastMeasure = measures[index - 1];
    const currentMeasure = measures[index];
    if (lastMeasure[lastMeasure.length - 1] === currentMeasure[0]) {
      lastMeasure[lastMeasure.length - 1] += '-';
    }
  }
  measures.forEach(measure => {
    if (measure.length > 1 && (measure[0] === measure[1] || _comparewithoutRedundantSigns(measure[0], measure[1]))) {
      let first = measure[0];
      const second = measure[1];
      const firstNumber = parseInt(first.slice(-1), 10);
      const secondNumber = parseInt(second.slice(-1), 10);
      first = `${first.slice(0, -1)}${firstNumber + secondNumber}`;
      measure.splice(0, 2, first);
    }
    if (measure.length > 2 && measure[1] === measure[2]) {
      let third = measure[1];
      const fourth = measure[2];
      const thirdNumber = parseInt(third.slice(-1), 10);
      const fourthNumber = parseInt(fourth.slice(-1), 10);
      third = `${third.slice(0, -1)}${thirdNumber + fourthNumber}`;
      measure.splice(1, 2, third);
    }
  });
  return _combineAbcMeasuresToVoice(measures);
};
 
const ModelUtilities = {
  convertMeasureSignToDefaultLength,
  addCrossVoicesSaftySigns,
  replaceDoubleValues,
  divideVoices,
  getVoices
};

export default ModelUtilities;
