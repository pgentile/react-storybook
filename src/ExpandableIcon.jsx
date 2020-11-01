import PropTypes from "prop-types";
import { css } from "emotion/macro";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

export default function ExpandableIcon({ expanded = false, ...otherProps }) {
  return (
    <span>
      <FontAwesomeIcon
        {...otherProps}
        className={css({
          transition: "transform 0.15s linear",
          position: "relative",
          top: "0.15em",
        })}
        icon={faAngleUp}
        rotation={expanded ? 180 : 90}
      />
    </span>
  );
}

ExpandableIcon.propTypes = {
  className: PropTypes.string,
  expanded: PropTypes.bool,
};
