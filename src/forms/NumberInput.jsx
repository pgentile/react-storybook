import React from "react";

import isDigits from "../utils/isDigits";

export default class NumberInput extends React.PureComponent {
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
