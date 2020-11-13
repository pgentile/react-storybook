import Button from "./Button";

export default {
  title: "Buttons / Button",
  component: Button,
  argTypes: {
    onClick: {
      action: "click",
    },
    as: {
      control: "text",
    },
    children: {
      control: null,
    },
  },
};

export function Main(args) {
  return <Button {...args}>Mon bouton</Button>;
}
