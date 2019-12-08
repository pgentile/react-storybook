import React, { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { noop } from "lodash-es";
import { IntlProvider } from "react-intl";
import areIntlLocalesSupported from "intl-locales-supported";

const ALWAYS_READY = !window || process.env.NODE_ENV === "test";

function getLanguage(locale) {
  return locale.split("-")[0];
}

async function loadPolyfills(locale) {
  // eslint-disable-next-line compat/compat
  if (!areIntlLocalesSupported(locale, [Intl.PluralRules])) {
    await import(
      /* webpackChunkName: "intl-pluralrules-polyfill" */
      /* webpackMode: "lazy" */
      "@formatjs/intl-pluralrules/polyfill"
    );

    const language = getLanguage(locale);
    await import(
      /* webpackChunkName: "intl-pluralrules-locale-data" */
      /* webpackInclude: /[fr|en]\.js$/ */
      /* webpackMode: "lazy" */
      `@formatjs/intl-pluralrules/dist/locale-data/${language}`
    );
  }
}

const loadMessagesForLocale = async (loadMessagesFn, locale) => {
  return loadMessagesFn(getLanguage(locale));
};

export const I18nContext = createContext({
  locale: "fr-FR",
  setLocale: noop,
  loading: false
});

export function I18nProvider({ defaultLocale, loadMessages, children }) {
  const [ready, setReady] = useState(ALWAYS_READY);
  const [locale, setLocale] = useState(defaultLocale);
  const [state, setState] = useState(() => ({
    loading: !ALWAYS_READY,
    locale: defaultLocale,
    messages: {}
  }));

  const load = async () => {
    setState({
      ...state,
      loading: true
    });

    await loadPolyfills(locale);
    const messages = await loadMessagesForLocale(loadMessages, locale);

    setState({
      loading: false,
      locale,
      messages
    });
    setReady(true);
  };

  useEffect(() => {
    if (!ALWAYS_READY) {
      load();
    }
  }, [locale]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!ready) {
    return null;
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, loading: state.loading }}>
      <IntlProvider key={locale} locale={state.locale} defaultLocale={defaultLocale} messages={state.messages}>
        {children}
      </IntlProvider>
    </I18nContext.Provider>
  );
}

I18nProvider.propTypes = {
  defaultLocale: PropTypes.string.isRequired,
  loadMessages: PropTypes.func,
  children: PropTypes.node
};

export function useLocale() {
  return useContext(I18nContext);
}
