import React from "react";
import PropTypes from "prop-types";

import bemModifiers from "../utils/bemModifiers";

import "./RadioImageInput.scss";

export default class RadioImageInput extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    checked: PropTypes.bool
  };

  static defaultProps = {
    checked: false
  };

  render() {
    const { children, checked } = this.props;

    const realClassName = bemModifiers("radio-image-input", {
      checked
    });

    return <span className={realClassName}>{children}</span>;
  }
}
