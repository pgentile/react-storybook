import React from "react";
import { storiesOf } from "@storybook/react";

import Language, { useLanguage } from "./Language";

storiesOf("Hooks / Language", module).add("main", () => {
  return (
    <Language>
      <DisplayLanguage />
      <SwitchLanguage />
    </Language>
  );
});

function DisplayLanguage() {
  const { language } = useLanguage();
  return (
    <p>
      <b>Language:</b> {languageToEmoji(language)}
    </p>
  );
}

function SwitchLanguage() {
  const { setLanguage } = useLanguage();
  return (
    <p>
      <button onClick={() => setLanguage("fr")}>{languageToEmoji("fr")}</button>
      <button onClick={() => setLanguage("de")}>{languageToEmoji("de")}</button>
      <button onClick={() => setLanguage("en")}>{languageToEmoji("en")}</button>
    </p>
  );
}

function languageToEmoji(language) {
  switch (language) {
    case "fr":
      return "🇫🇷";
    case "en":
      return "🇩🇪";
    case "de":
      return "🇬🇧";
    default:
      return language;
  }
}
