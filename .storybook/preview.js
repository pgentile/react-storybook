import React from "react";

// Il faut ajouter une variable à l'import pour que la globale
// regeneratorRuntime soit correctement définie
import rr from "regenerator-runtime/runtime";

import "../src/styles/global.scss";

export const globalTypes = {
  locale: {
    name: "Locale",
    defaultValue: "fr-FR",
    toolbar: {
      icon: "globe",
      items: [
        { value: "fr-FR", right: "🇫🇷", title: "Français (France)" },
        { value: "fr-BE", right: "🇧🇪", title: "Français (Belgique)" },
        { value: "fr-CH", right: "🇨🇭", title: "Français (Suisse)" },
        { value: "en-GB", right: "🇬🇧", title: "Anglais (Grande-Bretagne)" },
        { value: "en-US", right: "🇺🇸", title: "Anglais (Etats-Unis)" },
        { value: "nl-NL", right: "🇳🇱", title: "Néerlandais (Pays-Bas)" },
        { value: "nl-BE", right: "🇧🇪", title: "Néerlandais (Belgique)" },
        { value: "de-DE", right: "🇩🇪", title: "Allemand (Allemagne)" },
        { value: "de-CH", right: "🇨🇭", title: "Allemand (Suisse)" },
        { value: "es-ES", right: "🇪🇸", title: "Espagnol (Espagne)" },
        { value: "it-IT", right: "🇮🇹", title: "Italien (Italie)" },
      ],
    },
  },
};

export const decorators = [
  (Story) => {
    return (
      <div className="rs">
        <Story />
      </div>
    );
  },
  (Story, context) => {
    const { locale } = context.globals;
    return (
      <div lang={locale}>
        <Story />
      </div>
    );
  },
];
