import PropTypes from "prop-types";
import range from "lodash-es/range";

import LedIndicator from "./LedIndicator";

import "./LevelIndicator.scss";

export default function LevelIndicator({ as: Element = "div", className = "", level = 0, color }) {
  const leds = range(0, 3).map((index) => {
    return (
      <LedIndicator key={index} as="span" className="level-indicator__led" color={color} enabled={index < level} />
    );
  });

  return <Element className={"level-indicator " + className}>{leds}</Element>;
}

LevelIndicator.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  color: PropTypes.oneOf(["red", "blue", "green", "orange"]).isRequired,
  level: PropTypes.number,
};
