import React, { useState, useCallback } from "react";

import NumberInput from "./NumberInput";

export default {
  title: "Forms / NumberInput",
  component: NumberInput,
};

export const demo = () => <NumberInputDemo />;

function NumberInputDemo() {
  const [value, setValue] = useState("123");

  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  return <NumberInput value={value} onChange={handleChange} />;
}
