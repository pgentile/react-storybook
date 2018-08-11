import React from 'react';
import PropTypes from 'prop-types';

import bemModifiers from './bemModifiers';

import './Card.scss';


export default class Card extends React.PureComponent {

  static propTypes = {
    hasRoundedBorder: PropTypes.bool,
    layer: PropTypes.string,
    as: PropTypes.any,
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    hasRoundedBorder: false,
    as: 'div',
    className: '',
  };

  render() {
    const { as: Element, hasRoundedBorder, layer, className, children, onClick, ...otherProps } = this.props;

    const bemClass = bemModifiers('card', {
      'has-rounded-border': hasRoundedBorder,
      [`layer-${layer}`]: !!layer,
      'clickable': !!onClick,
    });

    return (
      <Element className={`${bemClass} ${className}`} onClick={onClick} {...otherProps}>
        {children}
      </Element>
    );
  }

}
