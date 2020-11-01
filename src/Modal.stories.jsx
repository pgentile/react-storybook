import Modal from "./Modal";

export default {
  title: "Modal",
  component: Modal,
  parameters: {
    storyshots: false,
  },
  argTypes: {
    children: {
      control: { disable: true },
    },
    onClose: {
      action: "close",
    },
  },
};

const template = (args) => {
  return <Modal {...args}>Contenu</Modal>;
};

export const main = template.bind({});

export const titleStory = template.bind({});

titleStory.args = {
  title: "Titre",
  onClose: null,
};

export const closable = template.bind({});

closable.args = {
  title: "Titre",
};
