import React, { useEffect } from "react";

import "../src/styles/global.scss";

// Il faut ajouter une variable à l'import pour que la globale
// regeneratorRuntime soit correctement définie
import rr from "regenerator-runtime/runtime";

function I18nWrapper({ children, locale }) {
  useEffect(() => {
    console.info("Curent locale is:", locale);
  }, [locale]);
  return children;
}

export const parameters = {
  i18n: {
    provider: I18nWrapper,
    supportedLocales: ["fr", "en"],
  },
};

export const decorators = [
  (storyFn) => {
    return <div className="rs">{storyFn()}</div>;
  },
];
