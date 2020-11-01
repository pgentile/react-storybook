import HeatedSeatButton from "./HeatedSeatButton";
import AutoClimButton from "./AutoClimButton";
import WindshieldButton from "./WindshieldButton";
import SyncButton from "./SyncButton";

import "./ClimPanel.scss";

export default function ClimPanel() {
  return (
    <div className="clim-panel">
      <HeatedSeatButton />
      <AutoClimButton />
      <SyncButton />
      <WindshieldButton />
      <HeatedSeatButton />
    </div>
  );
}
