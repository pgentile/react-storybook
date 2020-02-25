import React from "react";

import useColorScheme from "./useColorScheme";

import "./NightModePreference.scss";

export default function NightModePreference() {
  const colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark";

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
