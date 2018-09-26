import React from "react";
import { storiesOf } from "@storybook/react";

import ButtonGroup, { ButtonInGroup } from "./ButtonGroup";

storiesOf("Buttons / ButtonGroup", module)
  .add("main", () => {
    return (
      <ButtonGroup>
        <ButtonInGroup>Button 1</ButtonInGroup>
        <ButtonInGroup>Button 2</ButtonInGroup>
        <ButtonInGroup>Button 3</ButtonInGroup>
        <ButtonInGroup>Button 4</ButtonInGroup>
      </ButtonGroup>
    );
  })
  .add("large", () => {
    return (
      <ButtonGroup>
        <ButtonInGroup size="large">Button 1</ButtonInGroup>
        <ButtonInGroup size="large">Button 2</ButtonInGroup>
        <ButtonInGroup size="large" toggled>
          Button 3
        </ButtonInGroup>
        <ButtonInGroup size="large">Button 4</ButtonInGroup>
      </ButtonGroup>
    );
  });
