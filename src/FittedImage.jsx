import { memo } from "react";
import PropTypes from "prop-types";

import "./FittedImage.scss";

function FittedImage({ className = "", ...otherProps }) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img className={"fitted-image " + className} {...otherProps} />;
}

FittedImage.propTypes = {
  className: PropTypes.string,
};

export default memo(FittedImage);
