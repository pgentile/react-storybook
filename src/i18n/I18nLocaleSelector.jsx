import { useCallback } from "react";

import { useLocale } from "./I18nContext";

import "./I18nLocaleSelector.scss";

const LOCALES = [
  {
    locale: "fr-FR",
    flag: "🇫🇷",
    description: "France",
  },
  {
    locale: "en-GB",
    flag: "🇬🇧",
    description: "United Kingdom",
  },
  {
    locale: "en-US",
    flag: "🇺🇸",
    description: "USA",
  },
  {
    locale: "nl-NL",
    flag: "🇳🇱",
    description: "Nederland",
  },
  {
    locale: "it-IT",
    flag: "🇮🇹",
    description: "Italia",
  },
  {
    locale: "fr-BE",
    flag: "🇧🇪",
    description: "Belgique",
  },
  {
    locale: "nl-BE",
    flag: "🇧🇪",
    description: "België",
  },
  {
    locale: "de-BE",
    flag: "🇧🇪",
    description: "Belgien",
  },
  {
    locale: "de-DE",
    flag: "🇩🇪",
    description: "Deutschland",
  },
  {
    locale: "fr-CH",
    flag: "🇨🇭",
    description: "Suisse",
  },
  {
    locale: "de-CH",
    flag: "🇨🇭",
    description: "Schweiz",
  },
  {
    locale: "es-ES",
    flag: "🇪🇸",
    description: "España",
  },
];

export default function I18nLocaleSelector() {
  const { locale: currentLocale, setLocale, loading } = useLocale();

  const onFormSubmit = useCallback((event) => event.preventDefault(), []);

  const onLocaleChange = useCallback((event) => setLocale(event.currentTarget.value), [setLocale]);

  const items = LOCALES.map(({ locale, flag, description }) => {
    return (
      <li key={locale} className="i18n-locale-selector__item">
        <label>
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
