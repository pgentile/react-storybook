import { useState, useEffect, useCallback, useMemo } from "react";

export default function useTouched({ form } = {}) {
  const [touched, setTouched] = useState(false);

  const touch = useCallback(() => setTouched(true), []);

  useEffect(() => {
    const touchOnSubmit = () => touch();

    if (form) {
      form.registerOnSubmit(touchOnSubmit);
      return () => form.deregisterOnSubmit(touchOnSubmit);
    }
  }, [form, touch]);

  return useMemo(() => {
    return {
      touched,
      touch
    };
  }, [touch, touched]);
}
