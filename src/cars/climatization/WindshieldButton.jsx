import React, { useState } from "react";

import ClimButton from "./ClimButton";
import LedIndicator from "./LedIndicator";

export default function WindshieldButton() {
  const [enabled, setEnabled] = useState(false);

  return (
    <ClimButton
      onClick={() => setEnabled(!enabled)}
      topLed={<LedIndicator size="large" color="orange" enabled={enabled} />}
      title="Windshield"
    />
  );
}
