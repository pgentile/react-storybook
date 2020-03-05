import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion/macro";

function obliqueStripes(color) {
  return css`
    transition: background-color 0.3s ease-in;
    background: repeating-linear-gradient(45deg, transparent, transparent 10px, black 10px, black 20px);
    background-color: ${color};
  `;
}

const wipClass = css`
  ${obliqueStripes("yellow")}
  padding: 10px;

  &:hover {
    ${obliqueStripes("orange")}
  }
`;

const wipContainerClass = css`
  padding: 10px;
  background-color: white;
`;

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
