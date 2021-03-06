import { useState, useCallback } from "react";

import ClimButton from "./ClimButton";
import LedIndicator from "./LedIndicator";

export default function AutoClimButton() {
  const [enabled, setEnabled] = useState(false);

  const onButtonClick = useCallback(() => {
    setEnabled((prevValue) => !prevValue);
  }, []);

  return (
    <ClimButton
      onClick={onButtonClick}
      topLed={<LedIndicator size="large" color="green" enabled={enabled} />}
      title="Auto"
    />
  );
}
