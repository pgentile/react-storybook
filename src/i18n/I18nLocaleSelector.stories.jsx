import I18nLocaleSelector from "./I18nLocaleSelector";
import { I18nProvider } from "./I18nContext";

export default {
  title: "I18n / I18nLocaleSelector",
  component: I18nLocaleSelector,
  decorators: [
    (Story) => (
      <I18nProvider defaultLocale="fr-FR" loadMessages={loadMessages}>
        <Story />
      </I18nProvider>
    ),
  ],
};

function loadMessages() {
  return {};
}

export const main = () => {
  return <I18nLocaleSelector />;
};
