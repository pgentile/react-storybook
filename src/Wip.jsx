import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion/macro";

const wipClass = css({
  padding: "10px",
  transition: "background-color 0.3s ease-in",
  background: "repeating-linear-gradient(45deg, transparent, transparent 10px, black 10px, black 20px)",
  backgroundColor: "yellow",
  "&:hover": {
    backgroundColor: "orange"
  }
});

const wipContainerClass = css({
  padding: "10px",
  backgroundColor: "white"
});

export default function Wip({ children }) {
  return (
    <div className={wipClass}>
      <div className={wipContainerClass}>{children || "Work in progress"}</div>
    </div>
  );
}

Wip.propTypes = {
  children: PropTypes.node
};
