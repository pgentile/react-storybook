import React from "react";
import { storiesOf } from "@storybook/react";

import ManagedModal, { ManagedModalContainer } from "./ManagedModal";

storiesOf("ManagedModal", module).add("main", () => {
  return (
    <ManagedModalContainer>
      <ManagedModal name="yo">Yo</ManagedModal>
      <ManagedModal name="lo">Lo</ManagedModal>
    </ManagedModalContainer>
  );
});
