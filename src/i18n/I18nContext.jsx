import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { noop } from "lodash-es";
import { IntlProvider } from "react-intl";

import { shouldPolyfill as shouldPolyfillCanonicalLocales } from "@formatjs/intl-getcanonicallocales/should-polyfill";
import { shouldPolyfill as shouldPolyfillPluralRules } from "@formatjs/intl-pluralrules/should-polyfill";
import { shouldPolyfill as shouldPolyfillRelativeTimeFormat } from "@formatjs/intl-relativetimeformat/should-polyfill";
import { shouldPolyfill as shouldPolyfillListFormat } from "@formatjs/intl-listformat/should-polyfill";
import { shouldPolyfill as shouldPolyfillNumberFormat } from "@formatjs/intl-numberformat/should-polyfill";
import { shouldPolyfill as shouldPolyfillDateTimeFormat } from "@formatjs/intl-datetimeformat/should-polyfill";
import { shouldPolyfill as shouldPolyfillLocale } from "@formatjs/intl-locale/should-polyfill";

const ALWAYS_READY = !window || process.env.NODE_ENV === "test";

function getLanguage(locale) {
  return locale.split("-")[0];
}

async function loadPolyfills(locale) {
  const language = getLanguage(locale);

  if (shouldPolyfillCanonicalLocales()) {
    await import("@formatjs/intl-getcanonicallocales/polyfill");
  }

  if (shouldPolyfillLocale()) {
    await import("@formatjs/intl-locale/polyfill");
  }

  if (shouldPolyfillPluralRules()) {
    await import("@formatjs/intl-pluralrules/polyfill");
  }

  if (Intl.PluralRules.polyfilled) {
    await import(
      /* webpackChunkName: "intl-pluralrules-locale-data" */
      /* webpackInclude: /(fr|en)\.js$/ */
      /* webpackMode: "lazy" */
      `@formatjs/intl-pluralrules/locale-data/${language}`
    );
  }

  if (shouldPolyfillNumberFormat()) {
    await import("@formatjs/intl-numberformat/polyfill");
  }

  if (Intl.NumberFormat.polyfilled) {
    await import(
      /* webpackChunkName: "intl-numberformat-locale-data" */
      /* webpackInclude: /(fr|en)\.js$/ */
      /* webpackMode: "lazy" */
      `@formatjs/intl-numberformat/locale-data/${language}`
    );
  }

  if (shouldPolyfillRelativeTimeFormat()) {
    await import("@formatjs/intl-relativetimeformat/polyfill");
  }

  if (Intl.RelativeTimeFormat.polyfilled) {
    await import(
      /* webpackChunkName: "intl-relativetimeformat-locale-data" */
      /* webpackInclude: /(fr|en)\.js$/ */
      /* webpackMode: "lazy" */
      `@formatjs/intl-relativetimeformat/locale-data/${language}`
    );
  }

  if (shouldPolyfillListFormat()) {
    await import("@formatjs/intl-listformat/polyfill");
  }

  if (Intl.ListFormat.polyfilled) {
    await import(
      /* webpackChunkName: "intl-listformat-locale-data" */
      /* webpackInclude: /(fr|en)\.js$/ */
      /* webpackMode: "lazy" */
      `@formatjs/intl-listformat/locale-data/${language}`
    );
  }

  if (shouldPolyfillDateTimeFormat()) {
    await import("@formatjs/intl-datetimeformat/polyfill");
  }

  if (Intl.DateTimeFormat.polyfilled) {
    await import("@formatjs/intl-datetimeformat/add-all-tz");

    await import(
      /* webpackChunkName: "intl-datetimeformat-locale-data" */
      /* webpackInclude: /(fr|en)\.js$/ */
      /* webpackMode: "lazy" */
      `@formatjs/intl-datetimeformat/locale-data/${language}`
    );
  }
}

const loadMessagesForLocale = async (loadMessagesFn, locale) => {
  return loadMessagesFn(getLanguage(locale));
};

const I18nContext = createContext({
  locale: "fr-FR",
  setLocale: noop,
  loading: false,
});

I18nContext.displayName = "I18n";

export function I18nProvider({ defaultLocale, loadMessages, defaultRichTextElements = {}, children }) {
  const [ready, setReady] = useState(ALWAYS_READY);
  const [locale, setLocale] = useState(defaultLocale);
  const [state, setState] = useState(() => ({
    loading: !ALWAYS_READY,
    locale: defaultLocale,
    messages: {},
  }));

  const load = async () => {
    setState({
      ...state,
      loading: true,
    });

    await loadPolyfills(locale);
    const messages = await loadMessagesForLocale(loadMessages, locale);

    setState({
      loading: false,
      locale,
      messages,
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
      <IntlProvider
        key={locale}
        locale={state.locale}
        defaultLocale={defaultLocale}
        messages={state.messages}
        onError={onTransationError}
        wrapRichTextChunksInFragment
        defaultRichTextElements={defaultRichTextElements}
      >
        {children}
      </IntlProvider>
    </I18nContext.Provider>
  );
}

I18nProvider.propTypes = {
  defaultLocale: PropTypes.string.isRequired,
  loadMessages: PropTypes.func.isRequired,
  defaultRichTextElements: PropTypes.objectOf(PropTypes.func),
  children: PropTypes.node,
};

export function useLocale() {
  return useContext(I18nContext);
}

function onTransationError(error) {
  const shouldLogError = error.code !== "MISSING_TRANSLATION";
  if (shouldLogError) {
    console.error("Transation error", error);
  }
}
