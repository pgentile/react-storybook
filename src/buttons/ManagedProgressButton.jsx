import React from "react";
import PropTypes from "prop-types";

import ProgressButton from "./ProgressButton";

export default class ManagedProgressButton extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired
  };

  state = {
    loading: false,
    finished: false
  };

  onClick = async event => {
    this.setState({ loading: true });
    try {
      await this.props.onClick(event);
      this.setState({ finished: true });
    } catch (e) {
      this.setState({ loading: false });
      throw e;
    }
  };

  render() {
    return <ProgressButton {...this.props} {...this.state} onClick={this.onClick} />;
  }
}
