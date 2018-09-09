import React from "react";
import PropTypes from "prop-types";

import "./Carousel.scss";

export default class Carousel extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.node),
    selectedIndex: PropTypes.number
  };

  static defaultProps = {
    items: [],
    selectedIndex: 0
  };

  render() {
    const { items, selectedIndex } = this.props;

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
      left: `${currentIndex * -100}%`
    };

    return (
      <div className="carousel">
        <div className="carousel__items-container" style={contentStyle}>
          {renderedItems}
        </div>
      </div>
    );
  }
}
