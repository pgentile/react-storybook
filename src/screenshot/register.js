import React from "react";
import addons from "@storybook/addons";
import ScreenshotPanel from "./ScreenshotPanel";

// Register the addon with a unique name.
addons.register("screenshot/screenshot", api => {
  addons.addPanel("screenshot/screenshot/panel", {
    title: "Screenshot",
    // eslint-disable-next-line react/display-name
    render: () => <ScreenshotPanel api={api} />
  });
});
