import React from 'react';
import PropTypes from 'prop-types';

import './Price.scss';


export default class Price extends React.PureComponent {

  static propTypes = {
    as: PropTypes.any,
    className: PropTypes.string,
    value: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  };

  static defaultProps = {
    as: 'span',
    className: '',
  };

  render() {
    const { as: Element, className, value, currency } = this.props;
    const units = Math.floor(value);
    const cents = Math.floor((value * 100) % 100);

    return (
      <Element className={className}>
        <span className="price__units">{units}</span>
        ,&thinsp;
        <span className="price__cents">{cents}</span>
        &nbsp;
        <span className="price__currency">{currency}</span>
      </Element>
    );
  }

}
