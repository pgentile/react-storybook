import React from "react";
import PropTypes from "prop-types";

import Button from "./Button";
import bemModifiers from "../utils/bemModifiers";

import "./ProgressButton.scss";

// See https://codepen.io/teamturret/pen/KwyVQx
export default class ProgressButton extends React.PureComponent {
  static propTypes = {
    ...Button.propTypes,
    loading: PropTypes.bool,
    finished: PropTypes.bool,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    className: "",
    loading: false,
    finished: false,
    disabled: false,
  };

  render() {
    const { className, loading, finished, disabled, children, ...otherProps } = this.props;

    const progressBarClassName = bemModifiers("progress-button__progress-bar", {
      loading,
      finished,
    });

    return (
      <Button className={`progress-button ${className}`} disabled={loading || finished || disabled} {...otherProps}>
        <div className="progress-button__content">{children}</div>
        <div className={progressBarClassName} />
      </Button>
    );
  }
}
