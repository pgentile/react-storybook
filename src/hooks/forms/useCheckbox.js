import { useState, useMemo } from "react";

import useTouched from "./useTouched";
import defaultValidate from "./defaultValidate";

export default function useCheckbox(name, { defaultChecked = false, validate = defaultValidate, form } = {}) {
  const [checked, setChecked] = useState(defaultChecked);
  const { touched, touch } = useTouched({ form });

  const valid = useMemo(() => validate(checked), [validate, checked]);

  const props = useMemo(() => {
    return {
      name,
      checked,

      onChange(event) {
        setChecked(event.target.checked);
        touch();
      }
    };
  }, [name, checked, touched]);

  return {
    type: "checkbox",
    name,
    checked,
    touched,
    valid,
    props
  };
}
