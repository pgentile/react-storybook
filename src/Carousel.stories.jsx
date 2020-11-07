import Carousel from "./Carousel";

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

main.argTypes = {
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
