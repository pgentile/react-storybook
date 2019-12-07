import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number } from "@storybook/addon-knobs";

import I18nMessages from "./I18nMessages";

storiesOf("I18n | I18nMessages", module)
  .addDecorator(withKnobs)
  .add("main", () => {
    return (
      <I18nMessages
        userName={text("userName", "Jean")}
        tripCount={number("tripCount", 1)}
        cardCount={number("cardCount", 1)}
      />
    );
  });
