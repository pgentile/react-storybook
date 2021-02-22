import { useEffect, useState } from "react";
import { useAsync } from "react-use";
import useAbortableFetch, { useAbortSignal } from "./useAbortableFetch";

export default {
  title: "AbortableFetch",
  parameters: {
    storyshots: false,
  },
};

export function Main() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>
        <button type="button" onClick={() => setCount((current) => current + 1)}>
          Recréer le composant
        </button>
      </div>
      <CounterButton key={count} />
    </div>
  );
}

function CounterButton() {
  const [count, setCount] = useState(0);
  const [rerenderCount, setRerenderCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [fetching, setFetching] = useState(false);

  const makeSignal = useAbortSignal([count]);

  useEffect(() => {
    (async () => {
      setFetching(true);
      try {
        await fetch("https://httpbin.org/delay/5", { signal: makeSignal() });
        setSuccessCount((current) => current + 1);
      } catch {
        setErrorCount((current) => current + 1);
      } finally {
        setFetching(false);
      }
    })();
  }, [makeSignal, count]);

  const abortableFetch = useAbortableFetch([]);

  const ipAddress = useAsync(async () => {
    const response = await abortableFetch("https://httpbin.org/ip");
    const content = await response.json();
    return content.origin;
  }, [rerenderCount]);

  return (
    <section>
      <ul>
        <li>Count&nbsp;: {count}</li>
        <li>Succès&nbsp;: {successCount}</li>
        <li>Echecs&nbsp;: {errorCount}</li>
        <li>Fetching&nbsp;? {fetching ? "oui" : "non"}</li>
        <li>IP&nbsp;: {ipAddress.loading ? "Loading" : ipAddress.value}</li>
      </ul>
      <div style={{ display: "flex" }}>
        <button type="button" onClick={() => setCount((current) => current + 1)}>
          Incrémenter ({count} fois)
        </button>
        <button type="button" onClick={() => setRerenderCount((current) => current + 1)} style={{ marginLeft: "1rem" }}>
          Rerender
        </button>
      </div>
    </section>
  );
}
