import React, { Suspense } from "react";
import { withKnobs, text } from "@storybook/addon-knobs";

import HooksComments from "./HooksComments";

import Spinner from "../Spinner";

export default {
  title: "Hooks / HooksComments",
  component: HooksComments,
  decorators: [withKnobs],
  parameters: {
    storyshots: false,
  },
};

export const main = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <HooksComments referenceId={text("referenceId", "my-ref")} />
    </Suspense>
  );
};
