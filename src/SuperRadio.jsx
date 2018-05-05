import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import './SuperRadio.scss';


class SuperRadio extends React.PureComponent {

  static propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    description: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    forwardedRef: PropTypes.any,
  };

  static counter = 0;

  constructor(props) {
    super(props);

    SuperRadio.counter++;

    this.state = {
      id: `super-radio-${SuperRadio.counter}`,
    };
  }

  render() {
    const { label, icon, description, checked, onChange, forwardedRef } = this.props;
    const { id } = this.state;

    const bemBlock = block('super-radio');

    return (
      <div className={bemBlock + ' ' + bemBlock.modifier('checked', checked || false)}>
        <div className={bemBlock.element('radio-element')}>
          <input type="radio" id={id} checked={checked} onChange={onChange} ref={forwardedRef} />
        </div>
        {icon && <div className={bemBlock.element('icon')}>
          <label htmlFor={id}>
            <FontAwesomeIcon icon={icon} size="2x" />
          </label>
        </div>}
        <div className={bemBlock.element('label-element')}>
          <p className={bemBlock.element('label-title')}>
            <label htmlFor={id}>{label}</label>
          </p>
          {description && <p className={bemBlock.element('label-description')}>{description}</p>}
        </div>
      </div>
    );
  }

}


export default forwardRef((props, ref) => {
  return (
    <SuperRadio forwardedRef={ref} {...props} />
  );
});


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
