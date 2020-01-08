import React from "react";
import { action } from "@storybook/addon-actions";

import ManagedProgressButton from "./ManagedProgressButton";
import sleep from "../utils/sleep";

async function success(event) {
  event.persist();
  await sleep(3 * 1000);
  action("success")(event);
}

async function fail() {
  await sleep(3 * 1000);
  throw new Error("Failure");
}

export default {
  title: "Buttons / ManagedProgressButton",
  component: ManagedProgressButton
};

export const successStory = () => {
  return <ManagedProgressButton onClick={success}>Click me</ManagedProgressButton>;
};

export const failStory = () => {
  return <ManagedProgressButton onClick={fail}>Click me</ManagedProgressButton>;
};
