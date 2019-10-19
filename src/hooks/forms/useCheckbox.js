import { useState, useMemo, useCallback, useEffect } from "react";

import useTouched from "./useTouched";
import defaultValidate from "./defaultValidate";

export default function useCheckbox(name, { defaultChecked = false, validate = defaultValidate, form } = {}) {
  const [checked, setChecked] = useState(defaultChecked);
  const { touched, touch } = useTouched({ form });

  useEffect(() => {
    form.registerCollectDataFn(name, () => checked);
    return () => form.deregisterCollectDataFn(name);
  }, [form, name, checked]);

  const valid = useMemo(() => validate(checked), [validate, checked]);

  const onChange = useCallback(
    event => {
      setChecked(event.target.checked);
      touch();
    },
    [touch]
  );

  const props = useMemo(() => {
    return {
      name,
      checked,
      onChange
    };
  }, [name, checked, onChange]);

  return useMemo(() => {
    return {
      type: "checkbox",
      name,
      checked,
      touched,
      valid,
      props
    };
  }, [checked, name, props, touched, valid]);
}
