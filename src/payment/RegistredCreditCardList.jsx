import React from "react";
import PropTypes from "prop-types";

import RegistredCreditCard, { registredCreditCardShape } from "./RegistredCreditCard";

import "./RegistredCreditCardList.scss";

export default class RegistredCreditCardList extends React.PureComponent {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape(registredCreditCardShape)),
    onUseCard: PropTypes.func.isRequired
  };

  static defaultProps = {
    cards: []
  };

  state = {
    cardId: null
  };

  onShowCvv = cardId => {
    this.setState({
      cardId
    });
  };

  onHideCvv = () => {
    this.setState({
      cardId: null
    });
  };

  render() {
    const { cards, onUseCard } = this.props;
    const { cardId } = this.state;

    const renderedCarts = cards.map(card => {
      return (
        <RegistredCreditCard
          className="registred-credit-card-list__item"
          key={card.id}
          card={card}
          showCvv={card.id === cardId}
          onUseCard={onUseCard}
          onShowCvv={() => this.onShowCvv(card.id)}
          onHideCvv={this.onHideCvv}
        />
      );
    });

    return <div className="registred-credit-card-list">{renderedCarts}</div>;
  }
}
