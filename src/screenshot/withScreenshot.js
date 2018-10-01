import React from "react";
import ScreenshotDecorator from "./ScreenshotDecorator";

export default function withScreenshot(story) {
  return <ScreenshotDecorator>{story()}</ScreenshotDecorator>;
}
