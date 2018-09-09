import React from "react";
import PropTypes from "prop-types";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faCcVisa, faCcMastercard, faCcAmex } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTypeInfo } from "credit-card-type";

import ExpandableCard from "../ExpandableCard";
import Button from "../buttons/Button";
import FieldContainer from "../forms/FieldContainer";
import InputField from "../forms/InputField";
import NumberInput from "../forms/NumberInput";

import "./RegistredCreditCard.scss";

const brandIcons = {
  visa: faCcVisa,
  mastercard: faCcMastercard,
  "american-express": faCcAmex
};

export const registredCreditCardShape = {
  id: PropTypes.string.isRequired,
  maskedNumber: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  expirationDate: PropTypes.string.isRequired
};

export default class RegistredCreditCard extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    card: PropTypes.shape(registredCreditCardShape).isRequired,
    showCvv: PropTypes.bool,
    onShowCvv: PropTypes.func.isRequired,
    onHideCvv: PropTypes.func.isRequired,
    onUseCard: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: "",
    showCvv: false
  };

  state = {
    cvv: ""
  };

  onShowCvv = () => {
    this.props.onShowCvv();
  };

  onHideCvv = () => {
    this.setState({ cvv: "" });
    this.props.onHideCvv();
  };

  onUseCard = () => {
    const { card, onUseCard } = this.props;
    const { cvv } = this.state;

    onUseCard({
      id: card.id,
      cvv
    });
  };

  onCvvChange = event => {
    this.setState({
      cvv: event.target.value
    });
  };

  render() {
    const { className, card, showCvv } = this.props;
    const { maskedNumber, brand, expirationDate } = card;
    const [year, month] = expirationDate.split("-");
    const { cvv } = this.state;

    const cardBrandInfo = getTypeInfo(brand);
    const brandName = cardBrandInfo.niceType;
    const cvvLength = cardBrandInfo.code.size;
    const isMaestro = brand === "maestro";

    const cvvBlock = (
      <div className="registred-credit-card__cvv-container">
        <div className="registred-credit-card__cvv">
          <FieldContainer label="Code de sécurité" optional={isMaestro}>
            {props => (
              <InputField
                as={NumberInput}
                {...props}
                value={cvv}
                onChange={this.onCvvChange}
                maxLength={cvvLength}
                autoComplete="cc-csc"
              />
            )}
          </FieldContainer>
          <p>
            <Button size="small" onClick={this.onUseCard}>
              Utiliser
            </Button>
            <Button size="small" onClick={this.onHideCvv}>
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
              <b>Date d&apos;expiration&nbsp;:</b> {month}/{year}
            </p>
          </div>
          <div className="registred-credit-card__select">
            <Button onClick={showCvv ? this.onHideCvv : this.onShowCvv} toggled={showCvv}>
              Utiliser cette carte
            </Button>
          </div>
        </div>
      </ExpandableCard>
    );
  }
}
