import { useState, useMemo, useCallback, useEffect } from "react";

import useTouched from "./useTouched";
import defaultValidate from "./defaultValidate";

export default function useRadio(name, { defaultValue = "", validate = defaultValidate, form } = {}) {
  const [value, setValue] = useState(defaultValue);
  const { touched, touch } = useTouched({ form });

  useEffect(() => {
    form.registerCollectDataFn(name, () => value);
    return () => form.deregisterCollectDataFn(name);
  }, [form, name, value]);

  const valid = useMemo(() => validate(value), [validate, value]);

  const onChange = useCallback(
    event => {
      setValue(event.target.value);
      touch();
    },
    [touch]
  );

  const propsFor = useCallback(
    targetValue => {
      return {
        name,
        value: targetValue,
        checked: targetValue === value,
        onChange
      };
    },
    [name, value, onChange]
  );

  return useMemo(() => {
    return {
      type: "radio",
      name,
      valid,
      value,
      hasValue: !!value,
      touched,
      propsFor
    };
  }, [name, propsFor, touched, valid, value]);
}
