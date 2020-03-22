import React from "react";

import NightMode from "./NightMode";

export default {
  title: "NightMode",
  component: NightMode,
};

export const main = () => {
  return (
    <NightMode>
      <h1>Title</h1>
      <p>This is a night mode enabled component</p>
    </NightMode>
  );
};
