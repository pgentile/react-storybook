import { PureComponent } from "react";
import PropTypes from "prop-types";

import "./AdaptativeList.scss";

export default class AdaptativeList extends PureComponent {
  static propTypes = {
    as: PropTypes.elementType,
    className: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.node),
  };

  static defaultProps = {
    as: "div",
    className: "",
    items: [],
  };

  render() {
    const { as: Element, className, items } = this.props;

    const renderedItems = [];
    items.forEach((item, index) => {
      renderedItems.push(
        <div key={`item-${index}`} className="adaptative-list__item">
          {item}
        </div>
      );

      if (index + 1 < items.length) {
        renderedItems.push(<div key={`separator-${index}`} className="adaptative-list__separator" />);
      }
    });

    return <Element className={`adaptative-list ${className}`}>{renderedItems}</Element>;
  }
}
