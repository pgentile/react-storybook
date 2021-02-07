import { Suspense, lazy } from "react";

import Spinner from "./Spinner";

const CodeSplitted = lazy(() => import("./CodeSplitted"));

export default {
  title: "CodeSplitted",
  parameters: {
    storyshots: false,
  },
};

export const main = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <CodeSplitted />
    </Suspense>
  );
};
