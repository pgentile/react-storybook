import React from "react";

import ModalContainer from "./ModalContainer";
import { action } from "@storybook/addon-actions";

export default {
  title: "ModalContainer",
  component: ModalContainer
};

export const empty = () => {
  return <ModalContainer onClose={action("close")} />;
};

export const payment = () => {
  return <ModalContainer currentModal="payment" onClose={action("close")} />;
};
