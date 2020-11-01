import { useReducer, useCallback, useDebugValue } from "react";

import ClimButton from "./ClimButton";
import LevelIndicator from "./LevelIndicator";

export default function HeatedSeatButton() {
  const { coldLevel, heatLevel, change } = useLevels();
  return (
    <ClimButton
      onClick={() => change()}
      topLed={<LevelIndicator color="blue" level={coldLevel} />}
      title="Seat temp."
      bottomLed={<LevelIndicator color="red" level={heatLevel} />}
    />
  );
}

HeatedSeatButton.propTypes = {};

function useLevels() {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const { mode, level } = state;

  useDebugValue(`Mode: ${mode}`);
  useDebugValue(`Level: ${level}`);

  const change = useCallback(() => dispatch({ type: "CHANGE" }), []);

  return {
    coldLevel: mode === "cold" ? level : 0,
    heatLevel: mode === "heat" ? level : 0,
    change,
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
      level,
    };
  }

  return state;
}

const defaultState = {
  mode: "cold",
  level: 0,
};
