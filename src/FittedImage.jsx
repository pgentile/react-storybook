import { PureComponent } from "react";
import PropTypes from "prop-types";

import "./FittedImage.scss";

export default class FittedImage extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: "",
  };

  render() {
    const { className, ...otherProps } = this.props;
    return <img className={"fitted-image " + className} {...otherProps} />;
  }
}
