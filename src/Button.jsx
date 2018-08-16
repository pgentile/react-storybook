import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

import bemModifiers from './bemModifiers';


export default class Button extends React.PureComponent {

  static propTypes = {
    as: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    showDisabled: PropTypes.bool,
  };

  static defaultProps = {
    as: 'button',
    className: '',
    showDisabled: false,
  };

  render() {
    const { as: Element, children, className, showDisabled, ...otherProps } = this.props;

    const realClassName = bemModifiers('button', {
      disabled: showDisabled,
    });

    return (
      <Element className={`${realClassName} ${className}`} {...otherProps}>
        {children}
      </Element>
    );
  }

}
