import React, { useState } from "react";

import Shake from "./Shake";

export default {
  title: "Hooks / Shake",
  component: Shake
};

export const main = () => {
  return <Demo />;
};

function Demo() {
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
