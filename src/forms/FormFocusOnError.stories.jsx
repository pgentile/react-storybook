import React from "react";

import FormFocusOnError from "./FormFocusOnError";

export default {
  title: "Forms / FormFocusOnError",
  component: FormFocusOnError
};

export const main = () => {
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
};
