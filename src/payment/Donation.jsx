import React, { Fragment } from "react";
import PropTypes from "prop-types";

import ManagedProgressButton from "../buttons/ManagedProgressButton";
import ExpandableCard from "../ExpandableCard";
import ExpandableIcon from "../ExpandableIcon";

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

  state = {
    showDetails: false
  };

  onAddDonation = () => {
    this.setState(({ showDetails }) => {
      if (showDetails) {
        return { showDetails: false };
      }
      return null;
    });

    this.props.onAddDonation();
  };

  onToggleDetails = () => {
    this.setState(state => ({
      showDetails: !state.showDetails
    }));
  };

  render() {
    const { className, selectedDonation, onCancelDonation } = this.props;
    const { showDetails } = this.state;
    const hasDonationSelected = !!selectedDonation;

    const details = (
      <Fragment>
        <p>En savoir plus sur URCT...</p>
      </Fragment>
    );

    return (
      <ExpandableCard
        as="section"
        layer="flat"
        className={`donation ${className}`}
        expandableContent={details}
        expanded={showDetails}
      >
        {!hasDonationSelected && (
          <DonationProposal
            showDetails={showDetails}
            onToggleDetails={this.onToggleDetails}
            onAddDonation={this.onAddDonation}
          />
        )}

        {hasDonationSelected && <SelectedDonation donation={selectedDonation} onCancelDonation={onCancelDonation} />}
      </ExpandableCard>
    );
  }
}

class DonationProposal extends React.PureComponent {
  static propTypes = {
    showDetails: PropTypes.bool.isRequired,
    onToggleDetails: PropTypes.func.isRequired,
    onAddDonation: PropTypes.func.isRequired
  };

  onDetailsClick = event => {
    event.preventDefault();
    this.props.onToggleDetails();
  };

  render() {
    const { showDetails, onAddDonation } = this.props;
    return (
      <Fragment>
        <div className="donation__proposal">
          <div className="donation__proposal-logo">
            <img src="/images/urct-logo.svg" />
          </div>
          <div className="donation__proposal-punchline">
            <h3>Donner, c&apos;est facile avec un rien c&apos;est tout</h3>
            <p>
              Je soutiens une cause qui me tient à cœur.{" "}
              <a href="#" onClick={this.onDetailsClick}>
                En savoir plus <ExpandableIcon expanded={showDetails} />
              </a>
            </p>
          </div>
        </div>
        <p className="donation__proposal-donate-button">
          <ManagedProgressButton size="small" onClick={onAddDonation}>
            Donner 1&nbsp;€
          </ManagedProgressButton>
        </p>
      </Fragment>
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

  render() {
    const { donation, onCancelDonation } = this.props;

    return (
      <div className="donation__selection">
        <p className="donation__selection-thanks">
          Vous avez choisi de faire un don à <b>{donation.association}</b>. Nous vous en remercions&nbsp;!
        </p>
        <p className="donation__selection-cancel">
          <ManagedProgressButton className="donation__selection-cancel-button" size="small" onClick={onCancelDonation}>
            Annuler mon don
          </ManagedProgressButton>
        </p>
      </div>
    );
  }
}
