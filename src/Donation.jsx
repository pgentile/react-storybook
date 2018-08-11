import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';

import './Donation.scss';


export default class Donation extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string.isRequired,
    onAddDonation: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: '',
  };

  onAddDonation = () => {
    this.props.onAddDonation();
  }

  render() {
    const { className } = this.props;

    return (
      <Card
        as="section"
        className={`donation ${className}`}
        onClick={this.onAddDonation}>
        <p className="donation__question">Voulez-vous ajouter un don&nbsp;?</p>
      </Card>
    );
  }

}
