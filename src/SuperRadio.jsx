import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import './SuperRadio.scss';


export default class SuperRadio extends React.PureComponent {

  static propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.object,
    description: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static counter = 0;

  inputRef = createRef();
  inputId = `super-radio-${++SuperRadio.counter}`;

  selectRadio = (event) => {
    event.stopPropagation();

    const input = this.inputRef.current;
    if (input && !input.checked) {
      input.focus();
      input.click();
    }
  }

  render() {
    const { label, icon, description, checked, onChange } = this.props;

    const bemBlock = block('super-radio');

    return (
      <div
        className={bemBlock + ' ' + bemBlock.modifier('checked', checked || false)}
        onClick={this.selectRadio}>
        <div className={bemBlock.element('radio-element')}>
          <input
            ref={this.inputRef}
            type="radio"
            id={this.inputId}
            checked={checked}
            onChange={onChange} />
        </div>
        {icon && <div className={bemBlock.element('icon')}>
          <label htmlFor={this.inputId}>
            <FontAwesomeIcon icon={icon} size="3x" />
          </label>
        </div>}
        <div className={bemBlock.element('description')}>
          <p className={bemBlock.element('description-title')}>
            <label htmlFor={this.inputId}>{label}</label>
          </p>
          {description && <p className={bemBlock.element('description-description')}>{description}</p>}
        </div>
      </div>
    );
  }

}


function block(blockName) {
  return {
    toString: () => blockName,
    element: (elementName) => element(blockName, elementName),
    modifier: (modifierName, active) => modifier(blockName, null, modifierName, active),
  };
}


function element(blockName, elementName) {
  return {
    toString: () => `${blockName}__${elementName}`,
    modifier: (modifierName, active) => modifier(blockName, elementName, modifierName, active),
  };
}


function modifier(blockName, elementName, modifierName, active) {
  if (active === undefined || active === true) {
    return `${blockName}${elementName ? `__${elementName}` : ''}_${modifierName}`;
  }
  return '';
}
