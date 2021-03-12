import { useState } from "react";

import ProgressButton, { ProgressButtonProps } from "./ProgressButton";
import sleep from "../utils/sleep";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Buttons / ProgressButton",
  component: ProgressButton,
} as Meta<ProgressButtonProps>;

const Template: Story<ProgressButtonProps> = (args) => <ProgressButton {...args}>Payer</ProgressButton>;

export const Main: Story = () => <ProgressButtonDemo />;

export const LoadingStory = Template.bind({});

LoadingStory.args = {
  loading: true,
};

export const FinishedStory = Template.bind({});

FinishedStory.args = {
  finished: true,
};

export const DisabledStory = Template.bind({});

DisabledStory.args = {
  disabled: true,
};

function ProgressButtonDemo() {
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const onClick = async () => {
    setLoading(true);

    await sleep(3000);

    setLoading(false);
    setFinished(true);

    await sleep(2000);

    setFinished(false);
  };

  return (
    <ProgressButton loading={loading} finished={finished} onClick={onClick}>
      Payer
    </ProgressButton>
  );
}
