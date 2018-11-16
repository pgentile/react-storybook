import React, { Suspense } from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";

import HooksComments from "./HooksComments";

import Spinner from "../Spinner";

storiesOf("Hooks / HooksComments", module)
  .addDecorator(withKnobs)
  .add("main", () => {
    return (
      <Suspense fallback={<Spinner />}>
        <HooksComments referenceId={text("referenceId", "my-ref")} />
      </Suspense>
    );
  });
