import { useState } from "react";
import noop from "lodash-es";

export default function useTouched() {
  const [touched, setTouched] = useState(false);

  let touch = noop;
  if (!touched) {
    touch = () => setTouched(true);
  }

  return {
    touched,
    touch
  };
}
