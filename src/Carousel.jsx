import React from "react";
import PropTypes from "prop-types";

import "./Carousel.scss";

export default class Carousel extends React.PureComponent {
  static propTypes = {
    as: PropTypes.elementType,
    className: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.node),
    selectedIndex: PropTypes.number,
  };

  static defaultProps = {
    as: "div",
    className: "",
    items: [],
    selectedIndex: 0,
  };

  render() {
    const { as: Element, className, items, selectedIndex } = this.props;

    const renderedItems = items.map((item, index) => {
      return (
        <div key={index} className="carousel__item">
          {item}
        </div>
      );
    });

    const currentIndex = Math.max(0, Math.min(selectedIndex, items.length - 1));
    const contentStyle = {
      width: `${items.length * 100}%`,
      left: `${currentIndex * -100}%`,
    };

    return (
      <Element className={`carousel ${className}`}>
        <div className="carousel__items-container" style={contentStyle}>
          {renderedItems}
        </div>
      </Element>
    );
  }
}
