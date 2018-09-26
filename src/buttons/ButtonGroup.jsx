import React from "react";
import PropTypes from "prop-types";

import Button from "./Button";

import "./ButtonGroup.scss";

export default class ButtonGroup extends React.PureComponent {
  static propTypes = {
    as: PropTypes.any,
    className: PropTypes.string,
    children: PropTypes.node
  };

  static defaultProps = {
    as: "div",
    className: ""
  };

  render() {
    const { as: Element, className, children } = this.props;
    return <Element className={"button-group " + className}>{children}</Element>;
  }
}

export class ButtonInGroup extends React.PureComponent {
  static propTypes = {
    as: PropTypes.any,
    className: PropTypes.string,
    children: PropTypes.node
  };

  static defaultProps = {
    as: Button,
    className: ""
  };

  render() {
    const { as: Element, className, children, ...otherProps } = this.props;
    return (
      <Element {...otherProps} className={"button-group__button " + className}>
        {children}
      </Element>
    );
  }
}
