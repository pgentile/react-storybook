import React from "react";
import PropTypes from "prop-types";

import Card from "./Card";
import Button from "./Button";
import FlatButton from "./FlatButton";

import "./Donation.scss";

export default class Donation extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    selectedDonation: PropTypes.shape({
      code: PropTypes.string.isRequired,
      association: PropTypes.string.isRequired
    }),
    onAddDonation: PropTypes.func.isRequired,
    onCancelDonation: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: ""
  };

  onAddDonation = () => {
    this.props.onAddDonation();
  };

  onCancelDonation = () => {
    this.props.onCancelDonation();
  };

  render() {
    const { className, selectedDonation } = this.props;
    const hasDonationSelected = !!selectedDonation;

    return (
      <Card as="section" layer="flat" className={`donation ${className}`}>
        {!hasDonationSelected && (
          <FlatButton className="donation__add-button" onClick={this.onAddDonation}>
            Voulez-vous ajouter un don&nbsp;?
          </FlatButton>
        )}

        {hasDonationSelected && (
          <SelectedDonation donation={selectedDonation} onCancelDonation={this.onCancelDonation} />
        )}
      </Card>
    );
  }
}

class SelectedDonation extends React.PureComponent {
  static propTypes = {
    donation: PropTypes.shape({
      code: PropTypes.string.isRequired,
      association: PropTypes.string.isRequired
    }).isRequired,
    onCancelDonation: PropTypes.func.isRequired
  };

  onCancelDonation = () => {
    this.props.onCancelDonation();
  };

  render() {
    const { donation } = this.props;

    return (
      <div className="donation__selection">
        <p className="donation__selection-thanks">
          Vous avez choisi de faire un don à <b>{donation.association}</b>. Nous vous en remercions&nbsp;!
        </p>
        <p className="donation__selection-cancel">
          <Button size="small" onClick={this.onCancelDonation}>
            Annuler mon don
          </Button>
        </p>
      </div>
    );
  }
}
