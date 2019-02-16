import React from "react";
import { storiesOf } from "@storybook/react";

import FormFocusOnError from "./FormFocusOnError";

storiesOf("Forms / FormFocusOnError", module).add("main", () => {
  return (
    <FormFocusOnError>
      {focusOnError => {
        return (
          <div>
            <p>
              <button onClick={() => focusOnError()}>Click me</button>
            </p>
            <p style={{ height: "1000px" }} />
            <p>
              <input />
            </p>
            <p style={{ height: "1000px" }} />
            <p>
              <input aria-invalid />
            </p>
            <p style={{ height: "1000px" }} />
          </div>
        );
      }}
    </FormFocusOnError>
  );
});
