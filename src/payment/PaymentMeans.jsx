import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faCcVisa, faCcMastercard, faCcAmex } from "@fortawesome/free-brands-svg-icons";

import CheckableImageInput from "../forms/CheckableImageInput";

import "./PaymentMeans.scss";

export default class PaymentMeans extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    means: PropTypes.arrayOf(PropTypes.string.isRequired),
    selectedMean: PropTypes.string,
    disabled: PropTypes.bool,
    onMeanChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: "",
    means: []
  };

  onMeanChange = event => {
    this.props.onMeanChange(event.target.value);
  };

  render() {
    const { className, means, selectedMean, disabled } = this.props;

    const renderedMeans = means.map(mean => {
      return (
        <PaymentMean
          key={mean}
          mean={mean}
          checked={mean === selectedMean}
          disabled={disabled}
          onMeanChange={this.onMeanChange}
        />
      );
    });

    return <div className={`payment-means ${className}`}>{renderedMeans}</div>;
  }
}

const icons = {
  visa: faCcVisa,
  mastercard: faCcMastercard,
  "american-express": faCcAmex
};

class PaymentMean extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    mean: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onMeanChange: PropTypes.func.isRequired
  };

  render() {
    const { mean, checked, disabled, onMeanChange } = this.props;
    return (
      <CheckableImageInput
        className="payment-means__mean"
        name="mean"
        value={mean}
        checked={checked}
        disabled={disabled}
        onChange={onMeanChange}
      >
        <FontAwesomeIcon icon={icons[mean] || faCreditCard} size="2x" />
      </CheckableImageInput>
    );
  }
}
