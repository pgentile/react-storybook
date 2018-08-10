import React from 'react';
import PropTypes from 'prop-types';

import './Price.scss';


export default class Price extends React.PureComponent {

  static propTypes = {
    value: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  };

  render() {
    const { value, currency } = this.props;
    const units = Math.floor(value);
    const cents = Math.floor((value * 100) % 100);

    return (
      <span className="price">
        <span className="price__units">{units}</span>
        ,&thinsp;
        <span className="price__cents">{cents}</span>
        &nbsp;
        <span className="price__currency">{currency}</span>
      </span>
    );
  }

}
