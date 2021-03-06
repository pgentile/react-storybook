import { PureComponent } from "react";
import PropTypes from "prop-types";

import ManagedProgressButton from "../../buttons/ManagedProgressButton";
import ExpandableCard from "../../ExpandableCard";
import ExpandableIcon from "../../ExpandableIcon";
import Button from "../../buttons/Button";

import urctLogo from "./urct-logo.svg";

import "./DonationProposal.scss";

export default class DonationProposal extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onAddDonation: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: "",
  };

  state = {
    showDetails: false,
  };

  onDetailsClick = (event) => {
    event.preventDefault();

    this.setState((state) => ({
      showDetails: !state.showDetails,
    }));
  };

  render() {
    const { className, onAddDonation } = this.props;
    const { showDetails } = this.state;

    return (
      <ExpandableCard
        as="section"
        layer="flat"
        className={"donation-proposal " + className}
        expandableContent={<p className="donation-proposal__more">En savoir plus sur URCT...</p>}
        expanded={showDetails}
      >
        <div className="donation-proposal__content">
          <div className="donation-proposal__logo">
            <img src={urctLogo} alt="Logo URCT" />
          </div>
          <div className="donation-proposal__punchline">
            <h3>Donner, c&apos;est facile avec un rien c&apos;est tout</h3>
            <p>
              Je soutiens une cause qui me tient à cœur.{" "}
              <Button link type="button" onClick={this.onDetailsClick}>
                En savoir plus <ExpandableIcon expanded={showDetails} />
              </Button>
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
