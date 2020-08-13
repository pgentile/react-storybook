import React from "react";

import FittedImage from "./FittedImage";

export default {
  title: "FittedImage",
};

export const demo = (args) => {
  const { width } = args;
  return (
    <div style={{ width: `${width}px` }}>
      <FittedImage src="/images/beautiful-image.jpg" />
    </div>
  );
};

demo.args = {
  width: 300,
};
