import { PureComponent } from "react";
import PropTypes from "prop-types";

import Button from "./Button";

import "./ButtonGroup.scss";

export default class ButtonGroup extends PureComponent {
  static propTypes = {
    as: PropTypes.elementType,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    as: "div",
    className: "",
  };

  render() {
    const { as: Element, className, children } = this.props;
    return <Element className={"button-group " + className}>{children}</Element>;
  }
}

export class ButtonInGroup extends PureComponent {
  static propTypes = {
    as: PropTypes.elementType,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    as: Button,
    className: "",
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
