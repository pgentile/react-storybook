import React from "react";

import Label from "./Label";

export default {
  title: "Forms / Label",
  component: Label
};

export const main = () => {
  return <Label>Label</Label>;
};

export const optionalStory = () => {
  return <Label optional>Label</Label>;
};

export const disabledStory = () => {
  return <Label disabled>Label</Label>;
};

export const optionalAndDisabled = () => {
  return (
    <Label optional disabled>
      Label
    </Label>
  );
};
