/* eslint-disable compat/compat */

import "./Vibrator.scss";

export default function Vibrator() {
  const onVibrateClick = () => {
    navigator.vibrate([500, 100, 500, 100, 500]);
  };
  return (
    <div>
      <p>
        Puis-je vibrer ? <b>{navigator.vibrate ? "OUI" : "NON"}</b>
      </p>
      {navigator.vibrate && <button onClick={onVibrateClick}>Vibrer</button>}
    </div>
  );
}
