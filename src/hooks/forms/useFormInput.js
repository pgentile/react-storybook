import { useState, useMemo, useCallback, useEffect } from "react";

import useTouched from "./useTouched";
import defaultValidate from "./defaultValidate";

export default function useFormInput(name, { defaultValue = "", validate = defaultValidate, form } = {}) {
  const [value, setValue] = useState(defaultValue);
  const { touched, touch } = useTouched({ form });

  useEffect(() => {
    form.registerCollectDataFn(name, () => value);
    return () => form.deregisterCollectDataFn(name);
  }, [form, name, value]);

  const valid = useMemo(() => {
    return validate(value);
  }, [validate, value]);

  const onChange = useCallback(event => setValue(event.target.value), []);

  const onBlur = useCallback(() => touch(), [touch]);

  const props = useMemo(() => {
    return {
      name,
      value,
      onChange,
      onBlur
    };
  }, [name, value, onChange, onBlur]);

  return useMemo(() => {
    return {
      type: "input",
      name,
      value,
      hasValue: !!value,
      touched,
      valid,
      props
    };
  }, [name, props, touched, valid, value]);
}
