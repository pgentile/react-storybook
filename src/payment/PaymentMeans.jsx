import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faCcVisa, faCcMastercard, faCcAmex } from "@fortawesome/free-brands-svg-icons";

import CheckableImageInput from "../forms/CheckableImageInput";

import "./PaymentMeans.scss";

function PaymentMeans({ className = "", means = [], selectedMean, onMeanChange, disabled }) {
  const handleMeanChange = useCallback(
    (event) => {
      onMeanChange(event.target.value);
    },
    [onMeanChange]
  );

  const renderedMeans = means.map((mean) => {
    return (
      <PaymentMean
        key={mean}
        mean={mean}
        checked={mean === selectedMean}
        disabled={disabled}
        onMeanChange={handleMeanChange}
      />
    );
  });

  return <div className={`payment-means ${className}`}>{renderedMeans}</div>;
}

PaymentMeans.propTypes = {
  className: PropTypes.string,
  means: PropTypes.arrayOf(PropTypes.string.isRequired),
  selectedMean: PropTypes.string,
  disabled: PropTypes.bool,
  onMeanChange: PropTypes.func.isRequired,
};

export default memo(PaymentMeans);

const PaymentMean = memo(function PaymentMean({ mean, checked, disabled, onMeanChange }) {
  const icons = {
    visa: faCcVisa,
    mastercard: faCcMastercard,
    "american-express": faCcAmex,
  };

  const labels = {
    visa: "Visa",
    mastercard: "Mastercard",
    "american-express": "AMEX",
    maestro: "Maestro",
    "registred-cards": "Cartes enregistrées",
  };

  return (
    <CheckableImageInput
      className="payment-means__mean"
      name="mean"
      value={mean}
      label={labels[mean]}
      checked={checked}
      disabled={disabled}
      onChange={onMeanChange}
    >
      <FontAwesomeIcon icon={icons[mean] ?? faCreditCard} size="2x" />
    </CheckableImageInput>
  );
});

PaymentMean.propTypes = {
  mean: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onMeanChange: PropTypes.func.isRequired,
};
