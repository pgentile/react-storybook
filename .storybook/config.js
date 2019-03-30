import "core-js";
import "regenerator-runtime/runtime";

import { configure } from "@storybook/react";
import "loki/configure-react";

// automatically import all files ending in *.stories.js or *.stories.jsx
const req = require.context("../src", true, /.stories.jsx?$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
