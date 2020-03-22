import React from "react";
import PropTypes from "prop-types";

import ProgressButton from "./ProgressButton";

export default class ManagedProgressButton extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  state = {
    loading: false,
    finished: false,
  };

  unmounted = false;

  onClick = async (event) => {
    this.setState({ loading: true });
    try {
      await this.props.onClick(event);
      this.setStateIfMounted({ finished: true });
    } catch (e) {
      this.setStateIfMounted({ loading: false });
      throw e;
    }
  };

  setStateIfMounted(...args) {
    if (!this.unmounted) {
      this.setState(...args);
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  render() {
    return <ProgressButton {...this.props} {...this.state} onClick={this.onClick} />;
  }
}
