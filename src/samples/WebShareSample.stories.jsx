import React from "react";

import WebShareSample from "./WebShareSample";

export default {
  title: "Samples | WebShareSample",
  component: WebShareSample,
};

export const main = () => <WebShareSample url={document.URL} title="WebShare API sample" />;
