import { useState, useMemo } from "react";

import useTouched from "./useTouched";
import defaultValidate from "./defaultValidate";

export default function useFormInput(name, { defaultValue = "", validate = defaultValidate } = {}) {
  const [value, setValue] = useState(defaultValue);
  const { touched, touch } = useTouched();

  const valid = useMemo(() => {
    return validate(value);
  }, [validate, value]);

  const props = useMemo(() => {
    return {
      name,
      value,

      onChange(event) {
        setValue(event.target.value);
      },

      onBlur() {
        touch();
      }
    };
  }, [name, value, touched]);

  return {
    type: "input",
    name,
    value,
    hasValue: !!value,
    touched,
    valid,
    props
  };
}
