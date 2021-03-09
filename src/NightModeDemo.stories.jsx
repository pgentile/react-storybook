import { action } from "@storybook/addon-actions";

import useColorScheme from "./useColorScheme";

import ReCaptcha from "./ReCaptcha";

const siteKey = "6LcpzDMUAAAAAD_A6gfUl30elxinl3uWkkLlVnmt";

const onSuccess = action("success");
const onExpire = action("expire");

export default {
  title: "NightModeDemo",
  component: NightModeDemo,
  parameters: {
    storyshots: false,
  },
};

export const main = () => <NightModeDemo />;

function NightModeDemo() {
  const colorScheme = useColorScheme();
  return <ReCaptcha theme={colorScheme} siteKey={siteKey} onSuccess={onSuccess} onExpire={onExpire} />;
}
