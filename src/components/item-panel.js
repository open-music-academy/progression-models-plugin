import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Button, Collapse, Tooltip } from 'antd';

function ItemPanel({
  index,
  voiceLabel,
  dragHandleProps,
  isDragged,
  isOtherDragged
}) {
  const { t } = useTranslation();

  return (
    <div className={classNames('ItemPanel', { 'is-dragged': isDragged, 'is-other-dragged': isOtherDragged })} {...dragHandleProps}>
      {voiceLabel.text}
    </div>
  );
}

ItemPanel.propTypes = {
  canDeleteLastItem: PropTypes.bool,
  children: PropTypes.node.isRequired,
  header: PropTypes.string,
  index: PropTypes.number,
  dragHandleProps: PropTypes.object,
  isDragged: PropTypes.bool,
  isOtherDragged: PropTypes.bool,
  itemsCount: PropTypes.number,
  onDelete: PropTypes.func,
  onExtraActionButtonClick: PropTypes.func,
  onMoveDown: PropTypes.func,
  onMoveUp: PropTypes.func,
  voiceLabel: PropTypes.object.isRequired
};

ItemPanel.defaultProps = {
  canDeleteLastItem: false,
  extraActionButtons: [],
  header: '',
  index: 0,
  dragHandleProps: null,
  isDragged: false,
  isOtherDragged: false,
  itemsCount: 1,
  onDelete: null,
  onExtraActionButtonClick: () => {},
  onMoveDown: null,
  onMoveUp: null
};

export default ItemPanel;
