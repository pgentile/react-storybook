import React, { useState, useEffect, useRef } from "react";
import { storiesOf } from "@storybook/react";

import { TeleporterProvider, TeleporterSource, TeleporterTarget } from "./Teleporter";

storiesOf("Teleporter", module).add("main", () => {
  const [text, setText] = useState("");
  return (
    <TeleporterProvider>
      <div style={{ border: "red 2px solid" }}>
        <TeleporterSource>
          <p>Coucou {text}</p>
          <p>Hello {text}</p>
          <p>
            Random : <Random />
          </p>
        </TeleporterSource>
      </div>
      <div style={{ border: "blue 2px solid" }}>
        <TeleporterTarget />
      </div>
      <div style={{ border: "blue 2px solid" }}>
        <TeleporterTarget />
      </div>
      <div style={{ border: "blue 2px solid" }}>
        <TeleporterTarget />
      </div>
      <div style={{ border: "green 2px solid" }}>
        <input onChange={event => setText(event.target.value)} value={text} />
      </div>
    </TeleporterProvider>
  );
});

function Random() {
  const [value, setValue] = useState(() => Math.round(Math.random() * 100));

  useInterval(() => {
    setValue(value + 1);
  }, 1000);

  return <b>{value}</b>;
}

function useInterval(callback, delay) {
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const id = setInterval(() => {
      callbackRef.current();
    }, delay);

    return () => clearInterval(id);
  }, [delay]);
}
