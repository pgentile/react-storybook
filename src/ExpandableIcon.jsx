import React from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

import "./ExpandableIcon.scss";
import bemModifiers from "./bemModifiers";

export default class ExpandableIcon extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    expanded: PropTypes.bool.expanded
  };

  static defaultProps = {
    className: "",
    expanded: false
  };

  render() {
    const { className, expanded, ...otherProps } = this.props;

    const realClassName = bemModifiers("expandable-icon", { expanded });

    return (
      <span>
        <FontAwesomeIcon {...otherProps} className={`${realClassName} ${className}`} icon={faAngleUp} />
      </span>
    );
  }
}
