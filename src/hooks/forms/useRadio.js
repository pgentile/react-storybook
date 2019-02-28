import { useState, useMemo, useCallback } from "react";

import useTouched from "./useTouched";
import defaultValidate from "./defaultValidate";

export default function useRadio(name, { defaultValue = "", validate = defaultValidate, form } = {}) {
  const [value, setValue] = useState(defaultValue);
  const { touched, touch } = useTouched({ form });

  const valid = useMemo(() => validate(value), [validate, value]);

  const propsFor = useCallback(
    targetValue => {
      return {
        name,
        value: targetValue,
        checked: targetValue === value,

        onChange(event) {
          setValue(event.target.value);
          touch();
        }
      };
    },
    [name, value, touched]
  );

  return {
    type: "radio",
    name,
    valid,
    value,
    hasValue: !!value,
    touched,
    propsFor
  };
}
