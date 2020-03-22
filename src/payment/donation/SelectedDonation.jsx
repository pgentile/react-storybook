import React from "react";
import PropTypes from "prop-types";

import ManagedProgressButton from "../../buttons/ManagedProgressButton";
import Card from "../../Card";

import "./SelectedDonation.scss";

export default class SelectedDonation extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    donation: PropTypes.shape({
      code: PropTypes.string.isRequired,
      association: PropTypes.string.isRequired,
    }).isRequired,
    onCancelDonation: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: "",
  };

  render() {
    const { className, donation, onCancelDonation } = this.props;

    return (
      <Card as="section" layer="flat" className={"selected-donation " + className}>
        <p className="selected-donation__thanks">
          Vous avez choisi de faire un don à <b>{donation.association}</b>. Nous vous en remercions&nbsp;!
        </p>
        <p className="selected-donation__cancel">
          <ManagedProgressButton size="small" onClick={onCancelDonation}>
            Annuler mon don
          </ManagedProgressButton>
        </p>
      </Card>
    );
  }
}
