// Avalable voice model names
const getAvailableModels = [
  'initialCadence', 
  'cadence', 
  'circleOfFifths',
  'circleOfFifthsLinear',
  'fauxbourdon',
  'lamento',
  'fiveSixConsecutive',
  'parallelismDown',
  'parallelismUp',
  'parallelismDiminuated',
  'upperFiveModulation',
  'lowerFiveModulation'
];

// Model templates to create a voice model
const templates = {
  initialCadence: {
    key: '',
    name: 'initialCadence',
    modelKey: 'C',
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'initialCadence',
      abc: `X:1
%%score [1 (2 3)]
L:1/4
M:3/4
Q:50
K:Am
V:1
A | e3/2- e/8f/8e/8d/8 {d} e/>a/ |{e} d2 b- | b/4(c'/4b/4a/4) (b/4a/4^g/4^f/4 e/4d/4c/4B/4) |(B/4d/4c/4B/4){B} A x |
V:2
x | c c c | B B e | e e B | c/>d/ e/>d/ c3/4 x/4 |
V:3
"_J. S. Bach, Mathäus-Passion BWV 244, Teil II, Nr. 58, ›Aus Liebe‹"x | A A A | A A A | ^G G G | A/>B/ c/>B/ A3/4 x/4 |`
    },
    addProps: {}
  },
  cadence: {
    key: '',
    name: 'cadence',
    modelKey: 'C',
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'cadence',
      abc: ''
    },
    addProps: { 
      isBegin: [false, false],
      isFinal: [false, false],
      isDeceptiv: [false, false]
    }
  },
  circleOfFifths:  {
    key: '',
    name: 'circleOfFifths',
    modelKey: 'C',
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'circleOfFifths',
      abc: `X:1
%%score [(1 2) (3 4)]
Q: 1/4=80
L:1/8
M:C|
K:C
V:1
z g/=f/e/d/c/B/ | AcAF z f/e/d/c/B/A/ | GBGE z e/d/c/B/A/G/  | FAFD z d/c/B/A/G/F/ | E
V:2
E4- | E2 C2 D4- | D2 B,2 C4- | C2 A,2 B,4 | C2
V:3 bass
"_J. S. Bach, Präludium und Fuge C-Dur BWV 545, Fuge T. 96–100"z2 C2 | F,4 z2 B,2 | E,4 z2 A,2 | D,4 z2 G,2 | [G,2 C,,2]`,
    },
    addProps: {
      partLengthValues: [4, 4, false],
      partToBeginValues: [1, 4, false],
      bassReverse: [false, false]
    }
  },
  circleOfFifthsLinear: {
    key: '',
    name: 'circleOfFifthsLinear',
    modelKey: 'C',
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'circleOfFifthsLinear',
      abc: `X:1
%%score [(1 2) | 3]
L:1/16
M:C
Q:80
K:Dm
V:1
^f4 | g4 z dgd _e4 z cfc | d4 z B_eB c4 z AdA | BcAc B4 |
V:2
d2c2 | BdBd G4 z cGc F4 | z BFB _E4 z AEA D4- | D4 z2 D2 |
V:3 bass
"_J. S. Bach, Toccata und Fuge d-Moll BWV 913, Fuge T. 43 ff."D2D,2 | G,2A,2B,2G,2 C2B,2A,2F,2 | B,2A,2G,2_E,2 A,2G,2^F,2D,2 | G,2D,2 G,4 |`
    },
    addProps: {
      partLengthValues: [4, 4, false],
      partToBeginValues: [1, 4, false],
      lastBassNoteUp: [false, false]
    }
  },
  fauxbourdon: {
    key: '',
    name: 'fauxbourdon',
    modelKey: 'C',
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'fauxbourdon',
      abc: ''
    },
    addProps: {
      partLengthValues: [5, 5, false],
      syncopation: [true, false],
      chromaticBass: [false, false]
    }
  },
  lamento: {
    key: '',
    name: 'lamento',
    modelKey: 'C',
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'lamento',
      abc: ''
    },
    addProps: {
      syncopation: [true, false],
      chromatic3: [false, false],
      italianSixth: [false, false],
      chromatic2: [false, false]
    }
  },
  fiveSixConsecutive: {
    key: '',
    name: 'fiveSixConsecutive',
    modelKey: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'fiveSixConsecutive',
      abc: ''
    },
    addProps: {
      partLengthValues: [6, 6, false],
      partToBeginValues: [1, 6, false],
      diatonic: [false, false]
    }
  },
  lowerFiveModulation: {
    key: '',
    name: 'lowerFiveModulation',
    modelKey: 'C',
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'lowerFiveModulation',
      abc: `X:1
%%score [ ( 1 2 ) | ( 3 4 ) ]
L:1/4
M:C
Q:120
K:Eb
V:1
c d/e/ f2- | f2 e/d/e/f/ | d g2 f | =e c f2- |
f2 _e2- | e2 d/c/d/e/ | c f2 e | d B e2- |
e2 _d2- | d c |
V:2
c2- c/=B/c/d/ | =B G c2- | c2 _B2- | B2 A/G/A/B/ |
G c2 B | =A F B2- | B2 _A2- | A2 G/F/G/A/ |
F B2 A | B A |
V:3 bass
x4 | x4 | x4 | x4 |
x4 | x4 | x4 | x4 |
x2 B,2 | E2 |
V:4 bass
A, A,, A, G,/F,/ | G,4- | G,/F,/G,/A,/ G,/F,/=E,/D,/ | C,4- |  
C,/B,,/C,/D,/ C,/B,,/=A,,/G,,/ | F,,4- | F,,/E,/F,/G,/ F,/E,/D,/C,/ | B,,4- | 
B,,/A,/B,/C/ B,/A,/G,/F,/ | "_J. S. Bach, Präludium und Fuge Es-Dur BWV 876, Fuge T. 45–54 f." G, A, |`
    },
    addProps: {
      changeMode: [false, false]
    }
  },
  upperFiveModulation: {
    key: '',
    name: 'upperFiveModulation',
    modelKey: 'C',
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'upperFiveModulation',
      abc: `X:1
%%score [(1 2) 3]
Q: 1/4=80
L:1/8
M:C|
K:C
V:1
e4 | d3 d cBAd | BdBG
V: 2
ABGA | ^FD G4 ^F2 | G2 D2
V:3 bass
"_J. S. Bach, Präludium und Fuge C-Dur BWV 545, Fuge T. 95 f."C4- | C2 B,2 A,2 D2 |  G,4`
    },
    addProps: {
      changeMode: [false, false],
      begin65: [false, false],
      prinner: [false, false]
    }
  },
  parallelismDiminuated: {
    key: '',
    name: 'parallelismDiminuated',
    modelKey: 'C',
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'parallelismDiminuated',
      abc: `X:1
%%score [ 1 | 2 ]
L:1/16
M:C
Q:100
K:C
V:1
z Bea z Beg z cef z Gdf | z Gde z Gce z Acd z EBd | z EBc z EAc z FA_B z CGB | z CGA z CFA |
V:2 bass
"_J. S. Bach, kleines Präludium C-Dur BWV 924, T. 3–6"E,4 E4 A,4 B,4 | C4 E,4 ^F,4 ^G,4 | A,4 C,4 D,4 E,4 | F,4 E,4 |`
    },
    addProps: {
      numberOfSections: [4, 4, false],
      confirmation: [true, false]
    }
  },
  parallelismDown: {
    key: '',
    name: 'parallelismDown',
    modelKey: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'parallelismDown',
      abc: `X:1
%%score [( 1 2 ) | 3 ]
L:1/4
M:4/4
Q:100
K:Gm
U:s=!stemless!
V:1
V:2
V:3 bass 
V:1
g/ z/ z/4 d/4c/4B/4 | A- A/4B/4c/4d/4 G- G/4B/4_A/4G/4 | 
F- F/4G/4_A/4B/4 E- E/4G/4F/4E/4 | D- D/4D/4=E/4^F/4 G- G/4B/4A/4G/4 |  s^F
V:2
B/4D/4=E/4^F/4 G- | G/4G/4=F/4_E/4 D- D/4B,/4C/4D/4 E- | 
E/4E/4D/4C/4 B,- B,/4G,/4=A,/4=B,/4 C- | C/4[I:staff +1]C/4B,/4A,/4 G,- G,/4G,/4A,/4B,/4[I:staff -1] C/^C/ | D
V:3
"_J. S. Bach, Fuge in g-Moll BWV 861 (WtKl I), T. 24–28"G,,/G,/4A,/4 B,/A,/4G,/4 | D/D,/4E,/4 F,/E,/4D,/4 E,,/E,/4F,/4 G,/F,/4E,/4 | 
B,/B,,/4C,/4 D,/C,/4B,,/4 C,,/C,/4D,/4 E,/D,/4C,/4 | G,/G,,/4A,,/4 B,,/A,,/4G,,/4 E,2 | D,`
    },
    addProps: {
      numberOfSections: [3, 3, false],
      syncopation: [false, false],
      endWithoutSuspension: [true, false]
    }
  },
  parallelismUp: {
    key: '',
    name: 'parallelismUp',
    modelKey: 'C',
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'parallelismUp',
      abc: `X:1
%%score [( 1 2 ) | ( 3 4 )]
L:1/4
M:C
Q:50
K:Fm
V:1
z2 g2- | g f b2- | b a d'2- |
d' c'/b/ =a c'- | c' b G/b/g/=e/ |
V:2
"_Grave"f3 =e | a3 g | c'3 b | 
=e2 _e d/c/ | d f =e z |
V:3 bass
z4 | C2 E2- | E A F B | 
G2 C2 | D2 C z |
V:4
F,/G,/A,/F,/ C,/=D,/=E,/C,/ | F,/G,/A,/F,/ E,/F,/G,/E,/ | A,/B,/C/A,/ B,/C/D/B,/ | 
C/B,/A,/G,/ F,/_G,/F,/E,/ | "_G. B- Pergolesi, Stabat Mater P77 (Anfang)"D,/C,/D,/B,,/ C, z |`
    },
    addProps: {
      numberOfSections: [3, 3, false],
      chromatic: [false, false],
      syncopation: [false, false],
      endWithoutSuspension: [true, false]
    }
  }  
};
 
const ModelTemplates = {
  getModelTemplate: modelName => templates[modelName],
  getAvailableModels
};

export default ModelTemplates;
