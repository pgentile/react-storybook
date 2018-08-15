import React from 'react';
import PropTypes from 'prop-types';

import './FieldContainer.scss';


export default class FieldContainer extends React.PureComponent {

  static count = 0;

  static propTypes = {
    label: PropTypes.node,
    id: PropTypes.string,
    children: PropTypes.func.isRequired,
    errorMessages: PropTypes.arrayOf(PropTypes.node.isRequired),
    helpMessages: PropTypes.arrayOf(PropTypes.node.isRequired),
  };

  static defaultProps = {
    errorMessages: [],
    helpMessages: [],
  };

  generatedId = `form-field-${FieldContainer.count++}`;

  render() {
    const { id, label, children, errorMessages, helpMessages } = this.props;
    const showErrorMessages = errorMessages.length > 0;
    const showHelpMessages = helpMessages.length > 0 && !showErrorMessages;
    const inputId = id || this.generatedId;

    const fieldProps = {
      error: showErrorMessages,
      help: showHelpMessages,
      id: inputId,
    };

    return (
      <div className="form-field-container">

        {label && <label className="form-field-container__label" htmlFor={inputId}>
          {label}
        </label>}

        <div className="form-field-container__field">
          {children(fieldProps)}
        </div>

        {showErrorMessages &&
          <ul className="form-field-container__errors">
            {errorMessages.map((message, index) => (
              <li className="form-field-container__errors-message" key={index}>{message}</li>
            ))}
          </ul>}

        {(showHelpMessages) &&
          <ul className="form-field-container__help">
            {helpMessages.map((message, index) => (
              <li className="form-field-container__help-message" key={index}>{message}</li>
            ))}
          </ul>}

      </div>
    );
  }

}
