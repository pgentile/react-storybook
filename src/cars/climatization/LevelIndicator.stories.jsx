import React from "react";

import LevelIndicator from "./LevelIndicator";

export default {
  title: "Cars | Core / LevelIndicator",
  component: LevelIndicator,
};

export const level0 = () => {
  return <LevelIndicator color="blue" />;
};

export const level1 = () => {
  return <LevelIndicator color="blue" level={1} />;
};

export const level2 = () => {
  return <LevelIndicator color="blue" level={2} />;
};

export const level3 = () => {
  return <LevelIndicator color="blue" level={3} />;
};
