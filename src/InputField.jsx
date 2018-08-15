import React from 'react';
import PropTypes from 'prop-types';

import './InputField.scss';

import bemModifiers from './bemModifiers';


export default class InputField extends React.PureComponent {

  static propTypes = {
    error: PropTypes.bool,
    help: PropTypes.bool,
  };

  static defaultProps = {
    error: false,
    help: false,
  };

  render() {
    const { error, help, ...otherProps } = this.props;

    const className = bemModifiers('form-input-field', {
      error,
      help,
    });

    return (
      <input
        type="text"
        {...otherProps}
        className={className} />
    );
  }

}
