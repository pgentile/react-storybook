import React from "react";

import Wip from "./Wip";

export default {
  title: "Wip",
  component: Wip,
};

export const main = () => {
  return <Wip>Terminer ce composant</Wip>;
};

export const empty = () => {
  return <Wip />;
};
