import React from "react";

import Carousel from "./Carousel";

export default {
  title: "Carousel",
  component: Carousel,
};

export const main = (args) => {
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
    </p>,
  ];
  return <Carousel {...args} items={items} />;
};

main.args = {
  selectedIndex: 0,
};
