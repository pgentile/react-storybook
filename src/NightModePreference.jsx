import React, { useState } from "react";
import { useEffectOnce } from "react-use";

import "./NightModePreference.scss";

export default function NightModePreference() {
  const [darkMode, setDarkMode] = useState(false);

  useEffectOnce(() => {
    if (!window.matchMedia) {
      return;
    }

    const query = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(query.matches);

    const handler = event => setDarkMode(event.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  });

  return (
    <section className="night-mode-preference">
      <h1>Hello</h1>
      <p>Utilisation du night mode de l&apos;OS ?</p>
      <p>
        OS en <i>dark mode</i>&nbsp;? {darkMode ? "oui" : "non"}
      </p>
    </section>
  );
}
