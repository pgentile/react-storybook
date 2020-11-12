import InputWithFloatingLabel from "./InputWithFloatingLabel";

export default {
  title: "InputWithFloatingLabel",
  component: InputWithFloatingLabel,
  argTypes: {
    label: {
      control: "text",
    },
  },
};

function Template(args) {
  return <InputWithFloatingLabel {...args} />;
}

export const Main = Template.bind({});

Main.args = {
  label: "Nom de famille",
};
