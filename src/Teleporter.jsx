import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./Teleporter.scss";

const Context = createContext({
  nodes: null,
  setNodes: () => {},
});

Context.displayName = "Teleporter";

export function TeleporterProvider({ children }) {
  const [nodes, setNodes] = useState(null);
  return <Context.Provider value={{ nodes, setNodes }}>{children}</Context.Provider>;
}

TeleporterProvider.propTypes = {
  children: PropTypes.node,
};

export function TeleporterSource({ children }) {
  const { setNodes } = useContext(Context);

  useEffect(() => setNodes(children), [setNodes, children]);

  return null;
}

TeleporterSource.propTypes = {
  children: PropTypes.node,
};

export function TeleporterTarget() {
  const { nodes } = useContext(Context);
  return <>{nodes}</>;
}
