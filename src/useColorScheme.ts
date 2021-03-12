import { useState } from "react";
import { useEffectOnce } from "react-use";

type ColorScheme = "dark" | "light";

export default function useColorScheme(defaultScheme: ColorScheme = "light"): ColorScheme {
  const [colorScheme, setColorScheme] = useState(defaultScheme);

  useEffectOnce(() => {
    if (!window.matchMedia) {
      return;
    }

    const query = window.matchMedia("(prefers-color-scheme: dark)");
    setColorScheme(query.matches ? "dark" : "light");

    const handle = (event: MediaQueryListEvent) => setColorScheme(event.matches ? "dark" : "light");
    query.addEventListener("change", handle);
    return () => query.removeEventListener("change", handle);
  });

  return colorScheme;
}
