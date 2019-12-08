import React, { useCallback } from "react";

import { useLocale } from "./I18nContext";

import "./I18nLocaleSelector.scss";

const LOCALES = [
  {
    locale: "fr-FR",
    flag: "🇫🇷",
    description: "France"
  },
  {
    locale: "en-GB",
    flag: "🇬🇧",
    description: "United Kingdom"
  }
];

export default function I18nLocaleSelector() {
  const { locale: currentLocale, setLocale, loading } = useLocale();

  const onFormSubmit = useCallback(event => event.preventDefault(), []);

  const onLocaleChange = useCallback(event => setLocale(event.target.value), [setLocale]);

  const items = LOCALES.map(({ locale, flag, description }) => {
    const onClick = () => setLocale(locale);
    return (
      <li key={locale} className="i18n-locale-selector__item">
        <label onClick={onClick}>
          <input
            className="i18n-locale-selector__radio"
            type="radio"
            name="locale"
            value={locale}
            checked={locale === currentLocale}
            disabled={loading}
            onChange={onLocaleChange}
          />
          {flag}&nbsp;{description}
        </label>
      </li>
    );
  });

  return (
    <form onSubmit={onFormSubmit} className="i18n-locale-selector">
      <ul className="i18n-locale-selector__list">{items}</ul>
    </form>
  );
}
