import React from "react";
import { storiesOf } from "@storybook/react";

import ModalContainer from "./ModalContainer";
import { action } from "@storybook/addon-actions";

storiesOf("ModalContainer", module)
  .add("empty", () => {
    return <ModalContainer onClose={action("close")} />;
  })
  .add("payment", () => {
    return <ModalContainer currentModal="payment" onClose={action("close")} />;
  });
