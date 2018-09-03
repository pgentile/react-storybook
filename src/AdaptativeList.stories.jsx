import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";

import AdaptativeList from "./AdaptativeList";

storiesOf("AdaptativeList", module).add("main", () => {
  const items = [
    "Ligne 1",
    <p key={2} style={{ margin: "1rem" }}>
      Ligne 2
    </p>,
    "Ligne 3",
    <Fragment key={4}>
      Ligne 4<br />
      Et une sous-ligne
    </Fragment>
  ];

  return <AdaptativeList items={items} />;
});
