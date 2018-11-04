import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import Shake from "./Shake";

storiesOf("Hooks / Shake", module).add("main", () => {
  return <SkakeStory />;
});

function SkakeStory() {
  const [revision, setRevision] = useState(null);

  const onClick = () => {
    const newRevision = revision === null ? 0 : revision + 1;
    setRevision(newRevision);
  };

  return (
    <Shake onClick={onClick} revision={revision}>
      This element must shake
    </Shake>
  );
}
