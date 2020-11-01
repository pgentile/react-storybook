import { useState, useCallback } from "react";

import Toggle from "./Toggle";

export default {
  title: "Forms / Toggle",
  component: Toggle,
};

export const unchecked = () => {
  return <Toggle />;
};

export const checkedStory = () => {
  return <Toggle checked />;
};

export const demo = () => {
  return <ToggleDemo />;
};

export const disabledStory = () => {
  return <Toggle disabled />;
};

export const readOnlyStory = () => {
  return <Toggle readOnly />;
};

function ToggleDemo() {
  const [checked, setChecked] = useState(false);
  const onClick = useCallback(() => {
    setChecked((currentValue) => !currentValue);
  }, []);

  return <Toggle checked={checked} onClick={onClick} value="demo" />;
}
