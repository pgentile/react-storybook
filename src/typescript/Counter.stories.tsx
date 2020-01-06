import React from "react";

import Counter from "./Counter";

export default {
  title: "Counter",
  component: Counter
};

export const Main = () => <Counter intervalMs={500} />;
