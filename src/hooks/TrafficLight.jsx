import React, { memo, useState, useEffect, useDebugValue } from "react";
import { Machine } from "xstate";
import { interpret } from "xstate/lib/interpreter";

import bemModifiers from "../utils/bemModifiers";

import "./TrafficLight.scss";

const MACHINE = Machine({
  id: "traffic-light",
  initial: "red",
  states: {
    red: {
      after: {
        2000: "green"
      },
      on: {
        next: "green"
      }
    },
    orange: {
      after: {
        1000: "red"
      },
      on: {
        next: "red"
      }
    },
    green: {
      after: {
        3000: "orange"
      },
      on: {
        next: "orange"
      }
    }
  }
});

const LIGHT_COLORS = ["red", "orange", "green"];

export default memo(function TrafficLight() {
  const [current] = useMachine(MACHINE);

  const lights = LIGHT_COLORS.map(color => {
    const className = bemModifiers("traffic-light__light", {
      [`color-${color}`]: color === current.value
    });

    return <div key={color} className={className} />;
  });

  return <div className="traffic-light">{lights}</div>;
});

export function useMachine(machine) {
  // Keep track of the current machine state
  const [current, setCurrent] = useState(machine.initialState);

  const [service] = useState(() => {
    return interpret(machine).onTransition(state => setCurrent(state));
  });

  useEffect(() => {
    service.start();
    return () => service.stop();
  }, []);

  useDebugValue(`Current state is ${current.value}`);

  return [current, service.send];
}
