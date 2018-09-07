import React from "react";
import PropTypes from "prop-types";

import isDigits from "../utils/isDigits";

export default class NumberInput extends React.PureComponent {
  static propTypes = {
    type: PropTypes.string,
    inputMode: PropTypes.string
  };

  static defaultProps = {
    type: "tel",
    inputMode: "numeric"
  };

  onChange = event => {
    // Interdire autre chose que des chiffres
    if (!isDigits(event.target.value)) {
      event.preventDefault();
      return;
    }

    const { onChange } = this.props;
    if (onChange) {
      onChange(event);
    }
  };

  render() {
    return <input {...this.props} onChange={this.onChange} />;
  }
}
