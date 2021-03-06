import { useEffect, useRef, DependencyList, useCallback } from "react";

type FetchFn = WindowOrWorkerGlobalScope["fetch"];

export default function useAbortableFetch(deps?: DependencyList): FetchFn {
  const makeSignal = useAbortSignal(deps);

  const wrappedFetch = useCallback<FetchFn>(
    (input: RequestInfo, init?: RequestInit) => {
      return fetch(input, {
        ...init,
        signal: makeSignal(),
      });
    },
    [makeSignal]
  );

  return wrappedFetch;
}

export function useAbortSignal(deps?: DependencyList): () => AbortSignal | undefined {
  const abortControllerRef = useRef<AbortController>();

  useEffect(() => {
    // AbortController non implémenté ? On ne va pas plus loin.
    if (!AbortController) {
      return;
    }

    // eslint-disable-next-line compat/compat
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    return () => {
      abortController.abort();
    };
  }, deps);

  const makeSignal = useCallback(() => {
    return abortControllerRef.current?.signal;
  }, []);

  return makeSignal;
}
