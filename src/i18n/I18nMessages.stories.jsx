import React from "react";
import { withKnobs, text, number, select } from "@storybook/addon-knobs";

import I18nMessages from "./I18nMessages";

export default {
  title: "I18n | I18nMessages",
  component: I18nMessages,
  decorators: [withKnobs],
};

export const main = () => {
  return (
    <I18nMessages
      userName={text("userName", "Jean")}
      tripCount={number("tripCount", 1)}
      cardCount={number("cardCount", 1)}
      gender={select("gender", ["male", "female"], "male")}
    />
  );
};
