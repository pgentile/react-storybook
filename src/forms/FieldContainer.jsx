import React from "react";
import PropTypes from "prop-types";

import Label from "./Label";

import "./FieldContainer.scss";

export default class FieldContainer extends React.PureComponent {
  static count = 0;

  static propTypes = {
    as: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.node,
    id: PropTypes.string,
    children: PropTypes.func.isRequired,
    errorMessage: PropTypes.node,
    helpMessage: PropTypes.node,
    disabled: PropTypes.bool,
    optional: PropTypes.bool,
    readOnly: PropTypes.bool
  };

  static defaultProps = {
    as: "div",
    className: "",
    disabled: false,
    optional: false,
    readOnly: false
  };

  generatedId = `form-field-${FieldContainer.count++}`;

  render() {
    const {
      as: Element,
      className,
      id,
      label,
      children,
      errorMessage,
      helpMessage,
      disabled,
      optional,
      readOnly
    } = this.props;
    const showErrorMessage = !!errorMessage && !disabled;
    const showHelpMessage = !!helpMessage && !showErrorMessage && !disabled;
    const inputId = id || this.generatedId;

    const fieldProps = {
      error: showErrorMessage,
      id: inputId,
      disabled,
      readOnly
    };

    return (
      <Element className={`form-field-container ${className}`}>
        {label && (
          <Label className="form-field-container__label" htmlFor={inputId} optional={optional} disabled={disabled}>
            {label}
          </Label>
        )}

        <div className="form-field-container__field">{children(fieldProps)}</div>

        {showErrorMessage && <p className="form-field-container__error">{errorMessage}</p>}

        {showHelpMessage && <p className="form-field-container__help">{helpMessage}</p>}
      </Element>
    );
  }
}
