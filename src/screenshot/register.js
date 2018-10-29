import React from "react";
import addons from "@storybook/addons";
import ScreenshotPanel from "./ScreenshotPanel";

// Register the addon with a unique name.
addons.register("screenshot/screenshot", api => {
  const channel = addons.getChannel();
  addons.addPanel("screenshot/screenshot/panel", {
    title: "Screenshot",
    // eslint-disable-next-line
    render: ({ active }) => {
      return <ScreenshotPanel active={active} api={api} channel={channel} />;
    }
  });
});
