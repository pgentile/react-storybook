import { createContext, useState, useContext, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { noop } from "lodash-es";

const LanguageContext = createContext({
  language: null,
  country: null,
  setLanguage: noop,
});

LanguageContext.displayName = "Language";

export function useLanguage() {
  return useContext(LanguageContext);
}

export default function Language({ children }) {
  const [browserLanguage, setBrowserLanguage] = useState(
    () => localStorage.getItem("lang") || navigator.language || "fr-FR"
  );
  const { language, country } = parseBrowserLanguage(browserLanguage);

  useEffect(() => localStorage.setItem("lang", browserLanguage), [browserLanguage]);

  const setLanguage = useCallback(
    (newLanguage) => {
      setBrowserLanguage(newLanguage + "-" + country);
    },
    [country]
  );

  return <LanguageContext.Provider value={{ language, country, setLanguage }}>{children}</LanguageContext.Provider>;
}

Language.propTypes = {
  children: PropTypes.node,
};

function parseBrowserLanguage(browserLanguage) {
  const [language, country] = browserLanguage.split("-");
  return { language, country: country.toUpperCase() };
}
