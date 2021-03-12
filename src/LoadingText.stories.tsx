import { Meta, Story } from "@storybook/react";
import LoadingText, { LoadingTextProps } from "./LoadingText";

export default {
  title: "LoadingText",
  component: LoadingText,
} as Meta<LoadingTextProps>;

const Template: Story<LoadingTextProps> = (args) => <LoadingText {...args} />;

export const Main = Template.bind({});

export const ManyLines = Template.bind({});

ManyLines.args = {
  count: 10,
};

export const FewLines = Template.bind({});

FewLines.args = {
  count: 2,
};
