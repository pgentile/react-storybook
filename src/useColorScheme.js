import { useState } from "react";
import { useEffectOnce } from "react-use";

export default function useColorScheme(defaultScheme = "light") {
  const [colorScheme, setColorScheme] = useState(defaultScheme);

  useEffectOnce(() => {
    if (!window.matchMedia) {
      return;
    }

    const query = window.matchMedia("(prefers-color-scheme: dark)");
    setColorScheme(query.matches ? "dark" : "light");

    const handler = event => setColorScheme(event.matches ? "dark" : "light");
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  });

  return colorScheme;
}
