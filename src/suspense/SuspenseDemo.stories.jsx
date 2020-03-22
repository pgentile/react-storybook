import React from "react";

import SuspenseDemo from "./SuspenseDemo";

export default {
  title: "Suspense / SuspenseDemo",
  component: SuspenseDemo,
  parameters: {
    storyshots: false,
  },
};

export const main = () => {
  return <SuspenseDemo />;
};
