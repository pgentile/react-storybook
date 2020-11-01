import { useState, useEffect } from "react";

export default function ElapsedTime() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const handle = setTimeout(() => {
      setValue(value + 1);
    }, 1000);

    return () => clearTimeout(handle);
  });

  return (
    <div className="elapsed-time">
      <p>
        Il s&apos;est écoulé <b>{value}</b> secondes.
      </p>
      <p>
        <button onClick={() => setValue(0)}>Reset</button>
      </p>
    </div>
  );
}
