import React, { createContext } from "react";
import PropTypes from "prop-types";
import { uniq, noop } from "lodash-es";

import Modal from "./Modal";

const ManagedModalContext = createContext({
  modals: [],
  currentModal: null,
  addModal: noop,
  removeModal: noop
});

export default class ManagedModal extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node
  };

  static defaultProps = {};

  render() {
    const { name, children, ...otherProps } = this.props;
    return (
      <ManagedModalContext.Consumer>
        {({ addModal, removeModal, currentModal }) => (
          <RegistringModal
            {...otherProps}
            name={name}
            currentModal={currentModal}
            addModal={addModal}
            removeModal={removeModal}
          >
            {children}
          </RegistringModal>
        )}
      </ManagedModalContext.Consumer>
    );
  }
}

export class ManagedModalContainer extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  addModal = name => {
    console.info("Add modal " + name);

    this.setState(prevState => {
      const { modals: prevModals } = prevState;
      const modals = uniq([...prevModals, name]);
      return {
        modals,
        currentModal: name
      };
    });
  };

  removeModal = name => {
    this.setState(prevState => {
      const { modals: prevModals } = prevState;
      const modals = prevModals.filter(modal => modal !== name);

      if (prevModals.length === modals.length) {
        return null;
      }

      const currentModal = modals.length > 0 ? modals[modals.length - 1] : null;

      return {
        modals,
        currentModal
      };
    });
  };

  state = {
    modals: [],
    currentModal: null,
    addModal: this.addModal,
    removeModal: this.removeModal
  };

  render() {
    const { children } = this.props;
    return <ManagedModalContext.Provider value={this.state}>{children}</ManagedModalContext.Provider>;
  }
}

class RegistringModal extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node,
    currentModal: PropTypes.string,
    addModal: PropTypes.func.isRequired,
    removeModal: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.addModal(this.props.name, this.props.children);
  }

  componentWillUnmount() {
    this.props.removeModal(this.props.name);
  }

  render() {
    const { name, currentModal, children, addModal, removeModal, ...otherProps } = this.props;
    const displayModal = name === currentModal;

    if (!displayModal) {
      return null;
    }

    return (
      <Modal {...otherProps}>
        <p>{children}</p>
      </Modal>
    );
  }
}
