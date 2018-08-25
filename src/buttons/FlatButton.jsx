import React from "react";
import PropTypes from "prop-types";

import "./FlatButton.scss";

export default class FlatButton extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

  static defaultProps = {
    className: ""
  };

  render() {
    const { children, className, ...otherProps } = this.props;

    return (
      <button className={`flat-button ${className}`} {...otherProps}>
        {children}
      </button>
    );
  }
}
