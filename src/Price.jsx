import React from 'react';
import PropTypes from 'prop-types';

import './Price.scss';


export default class Price extends React.PureComponent {

  static propTypes = {
    as: PropTypes.any,
    className: PropTypes.string,
    price: PropTypes.shape({
      value: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    as: 'span',
    className: '',
  };

  render() {
    const { as: Element, className, price } = this.props;
    const { value, currency } = price;
    const units = Math.floor(value);
    const cents = Math.floor((value * 100) % 100);
    const centsDisplay = cents < 10 ? `0${cents}` : cents.toString();

    return (
      <Element className={`price ${className}`}>
        <span className="price__units">
          {units}
        </span>
        <span className="price__remaining">
          ,&thinsp;{centsDisplay}&nbsp;{currency}
        </span>
      </Element>
    );
  }

}
