import React, { Suspense, lazy } from "react";
import { storiesOf } from "@storybook/react";

import Spinner from "./Spinner";

const CodeSplitted = lazy(() => import("./CodeSplitted"));

storiesOf("CodeSplitted", module).add("main", () => {
  return (
    <Suspense fallback={<Spinner />}>
      <CodeSplitted />
    </Suspense>
  );
});
