import React from "react";
import renderer from "react-test-renderer";

import { faCoffee } from "@fortawesome/free-solid-svg-icons";

import SuperRadio from "./SuperRadio";

test("Super radio", () => {
  const component = renderer.create(<SuperRadio label="Label" description="This is my radio button" icon={faCoffee} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
