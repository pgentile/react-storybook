import React from "react";
import PropTypes from "prop-types";
import memoize from "fast-memoize";

import RegistredCreditCard, { registredCreditCardShape } from "./RegistredCreditCard";

import "./RegistredCreditCardList.scss";

export default class RegistredCreditCardList extends React.PureComponent {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape(registredCreditCardShape)),
    disabled: PropTypes.bool,
    onUseCard: PropTypes.func.isRequired
  };

  static defaultProps = {
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
    const { cards, disabled, onUseCard } = this.props;
    const { cardId } = this.state;

    const renderedCarts = cards.map(card => {
      return (
        <RegistredCreditCard
          className="registred-credit-card-list__item"
          key={card.id}
          card={card}
          disabled={disabled}
          showCvv={card.id === cardId}
          onUseCard={onUseCard}
          onShowCvv={this.onShowCvv(card.id)}
          onHideCvv={this.onHideCvv}
        />
      );
    });

    return <div className="registred-credit-card-list">{renderedCarts}</div>;
  }
}
