import React from "react";
import PropTypes from "prop-types";

import Insurance from "./Insurance";

export default class InsuranceContainer extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onAddInsurance: Insurance.propTypes.onAddInsurance
  };

  render() {
    const { className, onAddInsurance } = this.props;

    return <Insurance className={className} onAddInsurance={onAddInsurance} />;
  }
}
