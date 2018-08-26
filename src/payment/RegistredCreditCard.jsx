import React from "react";
import PropTypes from "prop-types";
import { faCcVisa, faCcMastercard, faCcAmex } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "../Card";
import Button from "../buttons/Button";

import "./RegistredCreditCard.scss";

const brands = {
  visa: {
    icon: faCcVisa,
    name: "Visa"
  },
  mastercard: {
    icon: faCcMastercard,
    name: "Mastercard"
  },
  "american-express": {
    icon: faCcAmex,
    name: "American Express"
  }
};

export default class RegistredCreditCard extends React.PureComponent {
  static propTypes = {
    cardId: PropTypes.string.isRequired,
    maskedNumber: PropTypes.string.isRequired,
    brand: PropTypes.oneOf(Object.keys(brands)).isRequired,
    expiration: PropTypes.shape({
      year: PropTypes.string.isRequired,
      month: PropTypes.string.isRequired
    }).isRequired,
    onUseCard: PropTypes.func.isRequired
  };

  onUseCard = () => {
    const { cardId, maskedNumber, brand, expiration, onUseCard } = this.props;

    onUseCard({
      cardId,
      maskedNumber,
      brand,
      expirationDate: `${expiration.year}-${expiration.month}`
    });
  };

  render() {
    const { maskedNumber, brand, expiration } = this.props;
    const { year, month } = expiration;

    return (
      <Card as="section" layer="flat" className="registred-credit-card">
        <div className="registred-credit-card__container">
          <div className="registred-credit-card__infos">
            <h1 className="registred-credit-card__brand-title">
              <FontAwesomeIcon icon={brands[brand].icon} />{" "}
              <span className="registred-credit-card__brand">Carte {brands[brand].name}</span>
            </h1>
            <p className="registred-credit-card__masked-number">
              <b>N° de carte&nbsp;:</b> {maskedNumber}
            </p>
            <p className="registred-credit-card__expiration">
              <b>Date d&apos;expiration&nbsp;:</b> {month}/{year}
            </p>
          </div>
          <div className="registred-credit-card__select">
            <Button onClick={this.onUseCard}>Utilisez cette carte</Button>
          </div>
        </div>
      </Card>
    );
  }
}
