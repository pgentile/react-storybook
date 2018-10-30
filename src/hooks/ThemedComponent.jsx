import React, { createContext, useState, useContext, useCallback } from "react";
import { noop } from "lodash-es";

import bemModifiers from "../utils/bemModifiers";

import "./ThemedComponent.scss";

const DEFAULT_THEME = "yellow";
const ALT_THEME = "red";

const ThemeContext = createContext({
  theme: DEFAULT_THEME,
  switchTheme: noop
});

export default function ThemedComponent() {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  const switchTheme = useCallback(
    () => {
      const newTheme = theme === DEFAULT_THEME ? ALT_THEME : DEFAULT_THEME;
      setTheme(newTheme);
    },
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      <ThemedContainer />
    </ThemeContext.Provider>
  );
}

function ThemedContainer() {
  const { theme, switchTheme } = useContext(ThemeContext);

  const className = bemModifiers("themed-component", {
    [theme]: true
  });

  return (
    <section className={className}>
      <p className="themed-component__line">
        <button onClick={() => switchTheme()}>Switch theme</button>
      </p>
      <p className="themed-component__line">Hello, my friend</p>
    </section>
  );
}
