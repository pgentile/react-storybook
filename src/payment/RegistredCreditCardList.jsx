import React from "react";
import PropTypes from "prop-types";
import memoize from "fast-memoize";

import RegistredCreditCard, { registredCreditCardShape } from "./RegistredCreditCard";

import "./RegistredCreditCardList.scss";

export default class RegistredCreditCardList extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    cards: PropTypes.arrayOf(PropTypes.shape(registredCreditCardShape)),
    totalPrice: PropTypes.shape({
      value: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired
    }).isRequired,
    disabled: PropTypes.bool,
    onUseCard: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: "",
    cards: []
  };

  state = {
    cardId: null
  };

  onShowCvv = memoize(cardId => {
    return () => {
      this.setState({
        cardId
      });
    };
  });

  onHideCvv = () => {
    this.setState({
      cardId: null
    });
  };

  render() {
    const { className, cards, totalPrice, disabled, onUseCard } = this.props;
    const { cardId } = this.state;

    const renderedCarts = cards.map(card => {
      return (
        <RegistredCreditCard
          className="registred-credit-card-list__item"
          key={card.id}
          card={card}
          totalPrice={totalPrice}
          disabled={disabled}
          showCvv={card.id === cardId}
          onUseCard={onUseCard}
          onShowCvv={this.onShowCvv(card.id)}
          onHideCvv={this.onHideCvv}
        />
      );
    });

    return <div className={"registred-credit-card-list " + className}>{renderedCarts}</div>;
  }
}
