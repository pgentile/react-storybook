import React, { useState } from "react";

import ClimButton from "./ClimButton";
import LedIndicator from "./LedIndicator";

export default function SyncButton() {
  const [enabled, setEnabled] = useState(false);

  return (
    <ClimButton
      onClick={() => setEnabled(!enabled)}
      topLed={<LedIndicator size="large" color="green" enabled={enabled} />}
      title="Sync"
    />
  );
}
