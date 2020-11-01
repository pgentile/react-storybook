import { action } from "@storybook/addon-actions";

import ReCaptcha from "./ReCaptcha";

const siteKey = "6LcpzDMUAAAAAD_A6gfUl30elxinl3uWkkLlVnmt";

const onSuccess = action("success");
const onExpire = action("expire");

const props = {
  siteKey,
  onSuccess,
  onExpire,
};

export default {
  title: "ReCaptcha",
  component: ReCaptcha,
};

export const main = () => <ReCaptcha {...props} />;

export const dark = () => <ReCaptcha {...props} theme="dark" />;

export const compact = () => <ReCaptcha {...props} size="compact" />;
