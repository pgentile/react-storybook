import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion/macro";
import { darken } from "polished";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";

import Expandable from "./Expandable";
import Card from "./Card";
import Button from "./buttons/Button";

const backgroundColor = "#eee";
const borderColor = "#bbb";

export default function ExpandableCard({ expanded = false, expandableContent, children, onFold, ...otherProps }) {
  const hasExpandableContent = Boolean(expandableContent);
  const hasFoldButton = Boolean(onFold);

  return (
    <Card {...otherProps}>
      {children}
      {hasExpandableContent && (
        <Expandable expanded={expanded}>
          <div
            className={css({
              // Fix for content margins...
              border: "0.01rem solid transparent",
              backgroundClip: "border-box",
              backgroundColor,
              backgroundImage: `linear-gradient(
              ${borderColor} 1px,
              ${darken(0.05, backgroundColor)},
              ${backgroundColor} 10px,
              ${backgroundColor} 1px,
              ${backgroundColor}
            )`,
            })}
          >
            {expandableContent}
          </div>
          {hasFoldButton && (
            <Button
              className={css({
                display: "block",
                width: "100%",
                fontSize: "0.8rem",
                padding: "0.3rem",
                backgroundColor: darken(0.03, backgroundColor),
                "&:hover": {
                  backgroundColor: darken(0.1, backgroundColor),
                },
              })}
              flat
              onClick={onFold}
            >
              <FontAwesomeIcon icon={faAngleDoubleUp} />
            </Button>
          )}
        </Expandable>
      )}
    </Card>
  );
}
ExpandableCard.propTypes = {
  ...Card.propTypes,
  expanded: PropTypes.bool,
  expandableContent: PropTypes.node,
  onFold: PropTypes.func,
};
