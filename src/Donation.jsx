import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';
import FlatButton from './FlatButton';

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
        layer="flat"
        className={`donation ${className}`}>
        <FlatButton className="donation__add-button" onClick={this.onAddDonation}>
          Voulez-vous ajouter un don&nbsp;?
        </FlatButton>
      </Card>
    );
  }

}
