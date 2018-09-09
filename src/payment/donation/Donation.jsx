import React from "react";
import PropTypes from "prop-types";

import SelectedDonation from "./SelectedDonation";
import DonationProposal from "./DonationProposal";

const donationShape = {
  code: PropTypes.string.isRequired,
  association: PropTypes.string.isRequired
};

export default class Donation extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    selectedDonation: PropTypes.shape(donationShape),
    onAddDonation: PropTypes.func.isRequired,
    onCancelDonation: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: ""
  };

  render() {
    const { className, selectedDonation, onAddDonation, onCancelDonation } = this.props;
    const hasDonationSelected = !!selectedDonation;

    return (
      <section className={className}>
        {hasDonationSelected && <SelectedDonation donation={selectedDonation} onCancelDonation={onCancelDonation} />}
        {!hasDonationSelected && <DonationProposal onAddDonation={onAddDonation} />}
      </section>
    );
  }
}
