import React from "react";
import PropTypes from "prop-types";

import ManagedProgressButton from "../../buttons/ManagedProgressButton";
import ExpandableCard from "../../ExpandableCard";
import ExpandableIcon from "../../ExpandableIcon";

import "./DonationProposal.scss";

export default class DonationProposal extends React.PureComponent {
  static propTypes = {
    onAddDonation: PropTypes.func.isRequired
  };

  state = {
    showDetails: false
  };

  onDetailsClick = event => {
    event.preventDefault();

    this.setState(state => ({
      showDetails: !state.showDetails
    }));
  };

  render() {
    const { onAddDonation } = this.props;
    const { showDetails } = this.state;

    return (
      <ExpandableCard
        layer="flat"
        className="donation-proposal"
        expandableContent={<p className="donation-proposal__more">En savoir plus sur URCT...</p>}
        expanded={showDetails}
      >
        <div className="donation-proposal__content">
          <div className="donation-proposal__logo">
            <img src="/images/urct-logo.svg" alt="Logo URCT" />
          </div>
          <div className="donation-proposal__punchline">
            <h3>Donner, c&apos;est facile avec un rien c&apos;est tout</h3>
            <p>
              Je soutiens une cause qui me tient à cœur.{" "}
              <a href="#" onClick={this.onDetailsClick}>
                En savoir plus <ExpandableIcon expanded={showDetails} />
              </a>
            </p>
          </div>
        </div>
        <p className="donation-proposal__button">
          <ManagedProgressButton size="small" onClick={onAddDonation}>
            Donner 1&nbsp;€
          </ManagedProgressButton>
        </p>
      </ExpandableCard>
    );
  }
}
