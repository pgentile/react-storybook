import { configure, addDecorator } from "@storybook/react";
import "loki/configure-react";

import withScreenshot from "../src/screenshot/withScreenshot";

// automatically import all files ending in *.stories.js or *.stories.jsx
const req = require.context("../src", true, /.stories.jsx?$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withScreenshot);

configure(loadStories, module);
