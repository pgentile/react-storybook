import React from 'react';
import PropTypes from 'prop-types';

import './Price.scss';


export default class Price extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  };

  render() {
    const { className, value, currency } = this.props;
    const units = Math.floor(value);
    const cents = Math.floor((value * 100) % 100);

    return (
      <div className={`price ${className}`}>
        <span className="price__units">{units}</span>
        ,&thinsp;
        <span className="price__cents">{cents}</span>
        &nbsp;
        <span className="price__currency">{currency}</span>
      </div>
    );
  }

}
