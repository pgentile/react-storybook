import React, { useReducer, useCallback, useDebugValue } from "react";
import PropTypes from "prop-types";

import LevelIndicator from "./LevelIndicator";

import "./HeatedSeatButton.scss";

export default function HeatedSeatButton({ as: Element = "div" }) {
  const { coldLevel, heatLevel, change } = useLevels();
  return (
    <Element className="heated-seat-button" onClick={() => change()}>
      <LevelIndicator className="heated-seat-button__cold" color="blue" level={coldLevel} />
      <div className="heated-seat-button__title">Seat temp.</div>
      <LevelIndicator className="heated-seat-button__heat" color="red" level={heatLevel} />
    </Element>
  );
}

HeatedSeatButton.propTypes = {
  as: PropTypes.elementType
};

function useLevels() {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const { mode, level } = state;

  useDebugValue(`Mode: ${mode}`);
  useDebugValue(`Level: ${level}`);

  const change = useCallback(() => dispatch({ type: "CHANGE" }), []);

  return {
    coldLevel: mode === "cold" ? level : 0,
    heatLevel: mode === "heat" ? level : 0,
    change
  };
}

function reducer(state, action) {
  if (action.type === "CHANGE") {
    const maxLevel = 3;
    let { mode, level } = state;

    if (mode === "off") {
      mode = "cold";
    }

    if (level < maxLevel) {
      level++;
    } else {
      switch (mode) {
        case "cold":
          mode = "heat";
          level = 1;
          break;
        case "heat":
          mode = "off";
          level = 0;
          break;
      }
    }

    return {
      mode,
      level
    };
  }

  return state;
}

const defaultState = {
  mode: "cold",
  level: 0
};
