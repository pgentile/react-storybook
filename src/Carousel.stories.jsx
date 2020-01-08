import React from "react";
import { withKnobs, number } from "@storybook/addon-knobs";

import Carousel from "./Carousel";

export default {
  title: "Carousel",
  component: Carousel,
  decorators: [withKnobs]
};

export const main = () => {
  const items = [
    <p key={0}>
      Item 1<br />
      Item 1, line 2
    </p>,
    <p key={1}>Item 2</p>,
    <p key={2}>
      Item 3<br />
      Item 3, line 2<br />
      Item 3, line 3
    </p>
  ];
  return <Carousel items={items} selectedIndex={number("selectedIndex", 0)} />;
};
