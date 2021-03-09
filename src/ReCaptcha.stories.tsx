import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";

import ReCaptcha, { ReCaptchaProps } from "./ReCaptcha";

const siteKey = "6LcpzDMUAAAAAD_A6gfUl30elxinl3uWkkLlVnmt";

const onSuccess = action("success");
const onExpire = action("expire");

export default {
  title: "ReCaptcha",
  component: ReCaptcha,
  argTypes: {
    siteKey: {
      control: false,
    },
    theme: {
      control: "inline-radio",
    },
    size: {
      control: "inline-radio",
    },
    badge: {
      control: "inline-radio",
    },
  },
  parameters: {
    storyshots: false,
  },
} as Meta<ReCaptchaProps>;

const Template: Story<ReCaptchaProps> = (args) => <ReCaptcha {...args} />;

export const Main = Template.bind({});

Main.args = {
  siteKey,
  onSuccess,
  onExpire,
};

export const Dark = Template.bind({});

Dark.args = {
  ...Main.args,
  theme: "dark",
};

export const Compact = Template.bind({});

Compact.args = {
  ...Main.args,
  size: "compact",
};
