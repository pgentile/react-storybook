import React from "react";
import { storiesOf } from "@storybook/react";

import ManagedModal, { ManagedModalContainer } from "./ManagedModal";

storiesOf("ManagedModal", module).add("main", () => {
  return <ManagedModalDemo />;
});

const initialState = {
  yo: true,
  lo: true,
  zo: false
};

class ManagedModalDemo extends React.PureComponent {
  state = initialState;

  openModal = name => {
    this.setState({
      [name]: true
    });
  };

  closeModal = name => {
    this.setState({
      [name]: false
    });
  };

  onReloadClick = () => {
    this.setState(initialState);
  };

  render() {
    const { yo, lo, zo } = this.state;
    return (
      <ManagedModalContainer>
        <div>
          <button onClick={this.onReloadClick}>Reload</button>
        </div>
        {yo && (
          <ManagedModal name="yo" title="yo" onClose={() => this.closeModal("yo")}>
            Yo
          </ManagedModal>
        )}
        {lo && (
          <ManagedModal name="lo" title="lo" onClose={() => this.closeModal("lo")}>
            <p>Lo</p>
            <p>
              <button onClick={() => this.openModal("zo")}>Reload</button>
            </p>
          </ManagedModal>
        )}
        {zo && (
          <ManagedModal name="zo" title="zo" onClose={() => this.closeModal("zo")}>
            Lo
          </ManagedModal>
        )}
      </ManagedModalContainer>
    );
  }
}
