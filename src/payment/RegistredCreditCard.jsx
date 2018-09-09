import React from "react";
import PropTypes from "prop-types";
import { faCcVisa, faCcMastercard, faCcAmex } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ExpandableCard from "../ExpandableCard";
import Button from "../buttons/Button";
import FieldContainer from "../forms/FieldContainer";
import InputField from "../forms/InputField";
import NumberInput from "../forms/NumberInput";

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
    expirationDate: PropTypes.string.isRequired,
    onUseCard: PropTypes.func.isRequired
  };

  state = {
    showCvv: false,
    cvv: ""
  };

  onUseCard = () => {
    const { cardId, maskedNumber, brand, expirationDate, onUseCard } = this.props;
    const { cvv } = this.state;

    onUseCard({
      cardId,
      maskedNumber,
      brand,
      expirationDate,
      cvv
    });
  };

  onToggleCvv = () => {
    this.setState(state => {
      return {
        showCvv: !state.showCvv,
        cvv: ""
      };
    });
  };

  onCvvChange = event => {
    this.setState({
      cvv: event.target.value
    });
  };

  render() {
    const { maskedNumber, brand, expirationDate } = this.props;
    const { showCvv, cvv } = this.state;
    const [year, month] = expirationDate.split("-");

    const cvvBlock = (
      <div className="registred-credit-card__cvv-container">
        <div className="registred-credit-card__cvv">
          <FieldContainer label="Code de sécurité">
            {props => (
              <InputField
                as={NumberInput}
                {...props}
                value={cvv}
                onChange={this.onCvvChange}
                maxLength={4}
                autoComplete="cc-csc"
              />
            )}
          </FieldContainer>
          <p>
            <Button size="small" onClick={this.onUseCard}>
              Utiliser
            </Button>
            <Button size="small" onClick={this.onToggleCvv}>
              Annuler
            </Button>
          </p>
        </div>
      </div>
    );

    return (
      <ExpandableCard
        expanded={showCvv}
        expandableContent={cvvBlock}
        as="section"
        layer="flat"
        className="registred-credit-card"
      >
        <h1 className="registred-credit-card__title">
          <FontAwesomeIcon icon={brands[brand].icon} />{" "}
          <span className="registred-credit-card__brand">Carte {brands[brand].name}</span>
        </h1>

        <div className="registred-credit-card__separator" />

        <div className="registred-credit-card__details-container">
          <div className="registred-credit-card__details">
            <p className="registred-credit-card__details-line">
              <b>N° de carte&nbsp;:</b> {maskedNumber}
            </p>
            <p className="registred-credit-card__details-line">
              <b>Date d&apos;expiration&nbsp;:</b> {month}/{year}
            </p>
          </div>
          <div className="registred-credit-card__select">
            <Button onClick={this.onToggleCvv} toggled={showCvv}>
              Utiliser cette carte
            </Button>
          </div>
        </div>
      </ExpandableCard>
    );
  }
}
