import { Meta, Story } from "@storybook/react";
import Wip from "./Wip";

export default {
  title: "Wip",
  component: Wip,
} as Meta;

export const Main: Story = () => <Wip>Terminer ce composant</Wip>;

export const Empty: Story = () => <Wip />;
