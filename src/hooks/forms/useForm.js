import { useMemo, useRef, useEffect } from "react";
import noop from "lodash-es";

export default function useForm({ onSubmit = noop } = {}) {
  const onSubmitRef = useRef(onSubmit);

  useEffect(() => {
    onSubmitRef.current = onSubmit;
  }, [onSubmit]);

  return useMemo(() => {
    const collectDataFns = {};
    const submitCallbacks = [];

    const registerCollectDataFn = (name, f) => {
      collectDataFns[name] = f;
    };

    const deregisterCollectDataFn = name => {
      delete collectDataFns[name];
    };

    const registerOnSubmit = f => {
      submitCallbacks.push(f);
    };

    const deregisterOnSubmit = f => {
      console.info("FIXME Please", f);
    };

    const onSubmitCallback = event => {
      console.info("Submit", event);

      submitCallbacks.forEach(f => f());

      const data = {};
      Object.entries(collectDataFns).forEach(entry => {
        const [key, fn] = entry;
        data[key] = fn();
      });

      onSubmitRef.current(event, data);
    };

    return {
      registerCollectDataFn,
      deregisterCollectDataFn,
      registerOnSubmit,
      deregisterOnSubmit,
      onSubmit: onSubmitCallback
    };
  }, []);
}
