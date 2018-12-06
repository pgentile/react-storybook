import React from "react";
import PropTypes from "prop-types";

import "./LoadingText.scss";

export default class LoadingText extends React.PureComponent {
  static propTypes = {
    count: PropTypes.number
  };

  static defaultProps = {
    count: 5
  };

  render() {
    const { count } = this.props;

    const lines = [];
    for (let i = 0; i < count; i++) {
      lines.push(
        <p key={i} className="loading-text__line">
          &nbsp;
        </p>
      );
    }

    return <div className="loading-text">{lines}</div>;
  }
}
