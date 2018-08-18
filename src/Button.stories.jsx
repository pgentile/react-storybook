import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from "./Button";

const actions = {
  onClick: action("click")
};

const stories = storiesOf("Forms / Button", module)
  .add("main", () => {
    return <Button {...actions}>Mon bouton</Button>;
  })
  .add("disabled", () => {
    return (
      <Button {...actions} disabled>
        Mon bouton
      </Button>
    );
  })
  .add("show disabled", () => {
    return (
      <Button {...actions} showDisabled>
        Mon bouton
      </Button>
    );
  });

["small", "normal", "large"].forEach(size => {
  stories.add(`Taille ${size}`, () => {
    return (
      <Button {...actions} size={size}>
        Mon bouton
      </Button>
    );
  });
});
