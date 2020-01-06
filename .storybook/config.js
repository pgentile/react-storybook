import "core-js";
import "regenerator-runtime/runtime";

import { configure } from "@storybook/react";

configure(require.context("../src", true, /.stories.[jt]sx?$/), module);
