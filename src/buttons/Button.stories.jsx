import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from "./Button";

const actions = {
  onClick: action("click")
};

const sizes = ["small", "normal", "large"];

const stories = storiesOf("Buttons / Button", module)
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
  .add("flat", () => {
    return (
      <Button {...actions} flat>
        Mon bouton
      </Button>
    );
  })
  .add("toggled", () => {
    return (
      <Button {...actions} toggled>
        Mon bouton
      </Button>
    );
  });

sizes.forEach(size => {
  stories.add(`Taille ${size}`, () => {
    return (
      <Button {...actions} size={size}>
        Mon bouton
      </Button>
    );
  });
});
