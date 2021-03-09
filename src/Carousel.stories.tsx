import { Meta, Story } from "@storybook/react";
import Carousel from "./Carousel";

type StoryArgs = {
  selectedIndex: number;
};

export default {
  title: "Carousel",
  component: Carousel,
  argTypes: {
    as: {
      control: null,
    },
    items: {
      control: null,
    },
  },
} as Meta<StoryArgs>;

export const Main: Story<StoryArgs> = (args) => {
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

Main.args = {
  selectedIndex: 0,
};

Main.argTypes = {
  selectedIndex: {
    defaultValue: 0,
    control: {
      type: "range",
      min: 0,
      max: 2,
      step: 1,
    },
  },
};
