import React from "react";
import { action } from "@storybook/addon-actions";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

import SuperRadio from "./SuperRadio";

export default {
  title: "Forms / SuperRadio",
  component: SuperRadio
};

export const main = () => {
  return (
    <SuperRadio
      label="Radio button"
      description="This is my radio button"
      onChange={action("on checked change")}
      icon={faCoffee}
    />
  );
};

export const checkedStory = () => {
  return (
    <SuperRadio
      label="Radio button"
      description="This is my radio button"
      onChange={action("on checked change")}
      checked
      icon={faCoffee}
    />
  );
};

export const helpStory = () => {
  return (
    <SuperRadio
      label="Radio button"
      description="This is my radio button"
      onChange={action("on checked change")}
      icon={faCoffee}
      help={<p>This is my help</p>}
    />
  );
};

export const withoutIcon = () => {
  return <SuperRadio label="Radio button" description="This is my radio button" />;
};
