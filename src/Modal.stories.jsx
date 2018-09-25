import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Modal from "./Modal";

storiesOf("Modal", module)
  .add("main", () => {
    return <Modal>Contenu</Modal>;
  })
  .add("title", () => {
    return <Modal title="Titre">Contenu</Modal>;
  })
  .add("closable", () => {
    return (
      <Modal title="Titre" onClose={action("close")}>
        Contenu
      </Modal>
    );
  });
