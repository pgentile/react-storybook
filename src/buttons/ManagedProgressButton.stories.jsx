import React from "react";
import { storiesOf } from "@storybook/react";
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

storiesOf("Buttons / ManagedProgressButton", module)
  .add("success", () => {
    return <ManagedProgressButton onClick={success}>Click me</ManagedProgressButton>;
  })
  .add("fail", () => {
    return <ManagedProgressButton onClick={fail}>Click me</ManagedProgressButton>;
  });
