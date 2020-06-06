import { useEffect } from "react";
import { addParameters, addDecorator } from "@storybook/react";
import { withI18n } from "storybook-addon-i18n";

function I18nWrapper({ children, locale }) {
  useEffect(() => {
    console.info("Curent locale is:", locale);
  }, [locale]);
  return children;
}

addParameters({
  i18n: {
    provider: I18nWrapper,
    supportedLocales: ["fr", "en"],
  },
});

/*
// Il ajoute un attribut "dir"
addDecorator(withI18n);
*/
