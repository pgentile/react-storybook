import React from "react";

import LoadingText from "./LoadingText";

export default {
  title: "LoadingText",
  component: LoadingText
};

export const main = () => {
  return <LoadingText />;
};

export const manyLines = () => {
  return <LoadingText count={10} />;
};

export const fewLines = () => {
  return <LoadingText count={2} />;
};
