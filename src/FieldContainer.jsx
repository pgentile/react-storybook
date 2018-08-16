import React from 'react';
import PropTypes from 'prop-types';

import './FieldContainer.scss';


export default class FieldContainer extends React.PureComponent {

  static count = 0;

  static propTypes = {
    label: PropTypes.node,
    id: PropTypes.string,
    children: PropTypes.func.isRequired,
    errorMessage: PropTypes.node,
    helpMessage: PropTypes.node,
  };

  generatedId = `form-field-${FieldContainer.count++}`;

  render() {
    const { id, label, children, errorMessage, helpMessage } = this.props;
    const showErrorMessage = !!errorMessage;
    const showHelpMessage = !!helpMessage && !showErrorMessage;
    const inputId = id || this.generatedId;

    const fieldProps = {
      error: showErrorMessage,
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

        {showErrorMessage && <p className="form-field-container__error">{errorMessage}</p>}

        {showHelpMessage && <p className="form-field-container__help">{helpMessage}</p>}

      </div>
    );
  }

}
