import React from "react";
import PropTypes from "prop-types";

import isDigits from "../utils/isDigits";

export default class NumberInput extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func
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
    return <input {...this.props} type="tel" inputMode="numeric" onChange={this.onChange} />;
  }
}
