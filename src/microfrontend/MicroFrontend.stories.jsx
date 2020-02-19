import React from "react";

import MicroFrontend from "./MicroFrontend";

export default {
  title: "MicroFrontend | MicroFrontend",
  component: MicroFrontend,
  storyshots: false
};

export const main = () => <MicroFrontend id="sample" manifestUrl="/sample/manifest.json" />;

export const multipleFrontends = () => {
  return (
    <>
      <MicroFrontend id="sample1" manifestUrl="/sample/manifest.json" />
      <MicroFrontend id="sample2" manifestUrl="/sample/manifest.json" />
    </>
  );
};
