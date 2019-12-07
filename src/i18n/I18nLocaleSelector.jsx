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
  const { locale: currentLocale, setLocale } = useLocale();

  const onFormSubmit = useCallback(event => event.preventDefault(), []);

  const onLocaleChange = useCallback(event => setLocale(event.target.value), [setLocale]);

  const items = LOCALES.map(({ locale, flag, description }) => {
    const onClick = () => setLocale(locale);
    return (
      <li key={locale}>
        <label onClick={onClick}>
          <input
            type="radio"
            name="locale"
            value={locale}
            checked={locale === currentLocale}
            onChange={onLocaleChange}
          />
          {flag}&nbsp;{description}
        </label>
      </li>
    );
  });

  return (
    <form onSubmit={onFormSubmit}>
      <ul>{items}</ul>
    </form>
  );
}
