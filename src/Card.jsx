import React from 'react';
import PropTypes from 'prop-types';

import bemModifiers from './bemModifiers';

import './Card.scss';


export default class Card extends React.PureComponent {

  static propTypes = {
    hasRoundedBorder: PropTypes.bool,
    hasBorder: PropTypes.bool,
    layer: PropTypes.string,
    as: PropTypes.any,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    hasRoundedBorder: false,
    hasBorder: true,
    as: 'div',
    className: '',
  };

  render() {
    const { as: Element, hasBorder, hasRoundedBorder, layer, className, children, ...otherProps } = this.props;

    const bemClass = bemModifiers('card', {
      'has-rounded-border': hasRoundedBorder,
      'has-border': hasBorder,
      [`layer-${layer}`]: !!layer
    });

    return (
      <Element className={`${bemClass} ${className}`} {...otherProps}>
        {children}
      </Element>
    );
  }

}
