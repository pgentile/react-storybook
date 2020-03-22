import React from "react";
import PropTypes from "prop-types";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faCcVisa, faCcMastercard, faCcAmex } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTypeInfo } from "credit-card-type";

import ExpandableCard from "../ExpandableCard";
import Button from "../buttons/Button";
import RegistredCardCvvForm from "./RegistredCardCvvForm";

import "./RegistredCreditCard.scss";

const brandIcons = {
  visa: faCcVisa,
  mastercard: faCcMastercard,
  "american-express": faCcAmex,
};

export const registredCreditCardShape = {
  id: PropTypes.string.isRequired,
  maskedNumber: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  expirationDate: PropTypes.string.isRequired,
};

export default function RegistredCreditCard({
  className = "",
  card,
  totalPrice,
  showCvv,
  showCvvToggle = true,
  disabled,
  onShowCvv,
  onHideCvv,
  onUseCard,
}) {
  const { maskedNumber, brand, expirationDate } = card;
  const [year, month] = expirationDate.split("-");

  const cardBrandInfo = getTypeInfo(brand);
  const brandName = cardBrandInfo.niceType;

  const onUseCardCallback = ({ cvv }) => {
    onUseCard({
      id: card.id,
      cvv,
    });
  };

  const cvvBlock = (
    <div className="registred-credit-card__cvv-container">
      <div className="registred-credit-card__cvv">
        <RegistredCardCvvForm
          brand={brand}
          totalPrice={totalPrice}
          onUseCard={onUseCardCallback}
          onCancel={onHideCvv}
          disabled={disabled || !showCvv}
        />
      </div>
    </div>
  );

  return (
    <ExpandableCard
      expanded={showCvv}
      expandableContent={cvvBlock}
      as="section"
      layer="flat"
      className={`registred-credit-card ${className}`}
    >
      <h1 className="registred-credit-card__title">
        <FontAwesomeIcon icon={brandIcons[brand] || faCreditCard} />{" "}
        <span className="registred-credit-card__brand">Carte {brandName}</span>
      </h1>

      <div className="registred-credit-card__details-container">
        <div className="registred-credit-card__details">
          <p className="registred-credit-card__details-line">
            <b>N° de carte&nbsp;:</b> {maskedNumber}
          </p>
          <p className="registred-credit-card__details-line">
            <b>Date d&apos;expiration&nbsp;:</b> {month}
            &thinsp;/&thinsp;
            {year}
          </p>
        </div>
        {showCvvToggle && (
          <div className="registred-credit-card__select">
            <Button onClick={showCvv ? onHideCvv : onShowCvv} toggled={showCvv} disabled={disabled}>
              Utiliser cette carte
            </Button>
          </div>
        )}
      </div>
    </ExpandableCard>
  );
}

RegistredCreditCard.propTypes = {
  className: PropTypes.string,
  card: PropTypes.shape(registredCreditCardShape).isRequired,
  totalPrice: PropTypes.shape({
    value: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
  showCvv: PropTypes.bool,
  showCvvToggle: PropTypes.bool,
  disabled: PropTypes.bool,
  onShowCvv: PropTypes.func.isRequired,
  onHideCvv: PropTypes.func.isRequired,
  onUseCard: PropTypes.func.isRequired,
};
