import { useState } from "react";

export default function Counter() {
  const [value, increment, decrement] = useCounter();

  return (
    <div className="counter">
      <p>
        <b>{value}</b>
      </p>
      <p>
        <button onClick={() => increment()}>Increment</button>
      </p>
      <p>
        <button onClick={() => decrement()}>Decrement</button>
      </p>
    </div>
  );
}

function useCounter(initialValue = 0) {
  const [value, setValue] = useState(initialValue);

  const increment = () => setValue(value + 1);
  const decrement = () => setValue(value - 1);

  return [value, increment, decrement];
}
