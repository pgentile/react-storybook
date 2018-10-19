import React from "react";
import { storiesOf } from "@storybook/react";

import ManagedModal, { ManagedModalContainer } from "./ManagedModal";

storiesOf("ManagedModal", module).add("main", () => {
  return <ManagedModalDemo />;
});

class ManagedModalDemo extends React.PureComponent {
  state = {
    yo: true,
    lo: true
  };

  closeModal = name => {
    this.setState({
      [name]: false
    });
  };

  render() {
    const { yo, lo } = this.state;
    return (
      <ManagedModalContainer>
        {yo && (
          <ManagedModal name="yo" title="yo" onClose={() => this.closeModal("yo")}>
            Yo
          </ManagedModal>
        )}
        {lo && (
          <ManagedModal name="lo" title="lo" onClose={() => this.closeModal("lo")}>
            Lo
          </ManagedModal>
        )}
      </ManagedModalContainer>
    );
  }
}
