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

ManagedModalContext.displayName = "ManagedModal";

export default class ManagedModal extends React.Component {
  static contextType = ManagedModalContext;

  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node
  };

  static defaultProps = {};

  componentDidMount() {
    const { name } = this.props;
    const { addModal } = this.context;
    addModal(name);
  }

  componentWillUnmount() {
    const { name } = this.props;
    const { removeModal } = this.context;
    removeModal(name);
  }

  render() {
    const { name, children, ...otherProps } = this.props;
    const { currentModal } = this.context;
    const visible = currentModal === name;

    return (
      <Modal {...otherProps} visible={visible}>
        {children}
      </Modal>
    );
  }
}

export class ManagedModalContainer extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  addModal = name => {
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
