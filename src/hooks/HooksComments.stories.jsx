import React from "react";

import HooksComments from "./HooksComments";

export default {
  title: "Hooks / HooksComments",
  component: HooksComments,
  parameters: {
    storyshots: false,
  },
};

export const main = (args) => {
  return <HooksComments {...args} />;
};

main.args = {
  referenceId: "my-ref",
};
