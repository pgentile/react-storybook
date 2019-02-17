import React from "react";
import PropTypes from "prop-types";

import bemModifiers from "./utils/bemModifiers";

import "./Menu.scss";

export default class Menu extends React.PureComponent {
  static propTypes = {
    as: PropTypes.elementType,
    className: PropTypes.string,
    selectedItemKey: PropTypes.any,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.any.isRequired,
        content: PropTypes.node.isRequired,
        href: PropTypes.string,
        onClick: PropTypes.func
      })
    )
  };

  static defaultProps = {
    as: "nav",
    className: "",
    items: []
  };

  render() {
    const { as: Element, className, items, selectedItemKey } = this.props;

    const renderedItems = items.map(item => {
      const active = item.key === selectedItemKey;

      const itemClassName = bemModifiers("menu__item", {
        active
      });

      return (
        <li key={item.key} className={itemClassName}>
          <a className={"menu__link"} href={item.href || "#"} onClick={item.onClick}>
            {item.content}
          </a>
        </li>
      );
    });

    return (
      <Element className={"menu " + className}>
        <ul className="menu__list">{renderedItems}</ul>
      </Element>
    );
  }
}
