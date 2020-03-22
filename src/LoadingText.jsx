import React from "react";
import PropTypes from "prop-types";
import { range } from "lodash-es";

import "./LoadingText.scss";

export default class LoadingText extends React.PureComponent {
  static propTypes = {
    count: PropTypes.number,
  };

  static defaultProps = {
    count: 5,
  };

  render() {
    const { count } = this.props;

    const lines = range(count).map((index) => {
      return (
        <p key={index} className="loading-text__line">
          &nbsp;
        </p>
      );
    });

    return <div className="loading-text">{lines}</div>;
  }
}
