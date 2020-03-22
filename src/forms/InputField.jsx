import React from "react";
import PropTypes from "prop-types";

import "./InputField.scss";

import bemModifiers from "../utils/bemModifiers";

export default class InputField extends React.PureComponent {
  static propTypes = {
    as: PropTypes.elementType,
    className: PropTypes.string,
    error: PropTypes.bool,
    formNoValidate: PropTypes.bool,
  };

  static defaultProps = {
    as: "input",
    className: "",
    error: false,
    formNoValidate: true,
  };

  render() {
    const { as: Element, className, error, ...otherProps } = this.props;

    const inputClassName = bemModifiers("form-input-field", {
      error,
    });

    return <Element type="text" {...otherProps} className={`${inputClassName} ${className}`} aria-invalid={error} />;
  }
}
