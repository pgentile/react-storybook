import React from "react";
import { action } from "@storybook/addon-actions";

import Modal from "./Modal";

export default {
  title: "Modal",
  component: Modal,
  parameters: {
    storyshots: false,
  },
};

export const main = () => {
  return <Modal>Contenu</Modal>;
};

export const titleStory = () => {
  return <Modal title="Titre">Contenu</Modal>;
};

export const closable = () => {
  return (
    <Modal title="Titre" onClose={action("close")}>
      Contenu
    </Modal>
  );
};
