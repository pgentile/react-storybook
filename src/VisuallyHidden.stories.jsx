import React from "react";

import VisuallyHidden from "./VisuallyHidden";

export default {
  title: "VisuallyHidden",
  component: VisuallyHidden,
};

export const main = () => (
  <>
    Hey&nbsp;!
    <VisuallyHidden>Tu ne peux pas me voir</VisuallyHidden>
  </>
);
