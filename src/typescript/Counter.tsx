import React, { useEffect, useState, useRef } from "react";

import "./Counter.scss";

interface CounterProps {
  intervalMs: number;
}

export default function Counter({ intervalMs }: CounterProps) {
  const [counter, setCounter] = useState(0);

  useInterval(intervalMs, () => setCounter(counter + 1));

  return (
    <div>
      Counter is: <b>{counter}</b>
    </div>
  );
}

type IntervalCallbackFn = () => void;

function useInterval(intervalMs: number, f: IntervalCallbackFn) {
  const callback = useRef<IntervalCallbackFn>();
  callback.current = f;

  useEffect(() => {
    const id = setInterval(() => callback.current(), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
}
