import React, { createContext, useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { noop } from "lodash-es";
import { IntlProvider } from "react-intl";

const DEFAULT_LOCALE = "fr-FR";

export const I18nContext = createContext({
  locale: DEFAULT_LOCALE,
  setLocale: noop
});

export function I18nProvider({ loadMessages, children }) {
  const [locale, setLocale] = useState(DEFAULT_LOCALE);

  const messages = useMemo(() => {
    return loadMessages ? loadMessages(locale) : {};
  }, [loadMessages, locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale }}>
      <IntlProvider key={locale} locale={locale} defaultLocale={DEFAULT_LOCALE} messages={messages}>
        {children}
      </IntlProvider>
    </I18nContext.Provider>
  );
}

I18nProvider.propTypes = {
  loadMessages: PropTypes.func,
  children: PropTypes.node
};

export function useLocale() {
  return useContext(I18nContext);
}
