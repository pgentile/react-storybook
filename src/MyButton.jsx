import React from 'react';
import PropTypes from 'prop-types';


export default class MyButton extends React.PureComponent {

  static propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  };

  render() {
    const { label, onClick } = this.props;

    return (
      <button onClick={onClick}>
        <b>{label}</b>
      </button>
    );
  }

}
