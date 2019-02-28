import { useState, useEffect } from "react";
import noop from "lodash-es";

export default function useTouched({ form } = {}) {
  const [touched, setTouched] = useState(false);

  let touch = noop;
  if (!touched) {
    touch = () => setTouched(true);
  }

  useEffect(() => {
    const touchOnSubmit = () => touch();

    if (form) {
      form.registerOnSubmit(touchOnSubmit);
      return () => form.deregisterOnSubmit(touchOnSubmit);
    }
  }, []);

  return {
    touched,
    touch
  };
}
