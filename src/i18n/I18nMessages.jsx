import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

import { I18nProvider } from "./I18nContext";
import I18nLocaleSelector from "./I18nLocaleSelector";

function bold(...chunks) {
  return <b>{chunks}</b>;
}

function loadMessages(locale) {
  return new Promise(resolve => {
    setTimeout(() => {
      let messages = {};
      if (locale === "en") {
        messages = {
          hello: "Hello, {userName}!",
          "hello.formatted": "Hello, <b>{userName}</b>!",
          personal_infos: "Enter your <b>last name</b>, <b>first name</b> and <b>birthdate</b>",
          your_trips: `
            {tripCount, plural, =0 {No trip} one {Your <b>trip</b>} other {Your <b>{tripCount} trips</b>}}
          `,
          your_trips_and_cards: `
            {tripCount, plural, =0 {No trip} one {Your <b>trip</b>} other {Your <b>{tripCount} trips</b>}}
            and
            {cardCount, plural, =0 {no card} one {your <b>card</b>} other {your <b>{cardCount} cards</b>}}
          `
        };
      }

      resolve(messages);
    }, 500);
  });
}

export default function I18nMessages({ userName, tripCount, cardCount }) {
  return (
    <I18nProvider loadMessages={loadMessages} defaultLocale="fr-FR">
      <I18nLocaleSelector />
      <p>
        <FormattedMessage
          id="hello"
          description="Hello"
          defaultMessage="Salut, {userName}&nbsp;!"
          values={{ userName }}
        />
      </p>
      <p>
        <FormattedMessage
          id="hello.formatted"
          description="Hello"
          defaultMessage="Salut, <b>{userName}</b>&nbsp;!"
          values={{
            b: bold,
            userName
          }}
        />
      </p>
      <p>
        <FormattedMessage
          id="personal_infos"
          description="Ask user its personal informations"
          defaultMessage="Entrez vos <b>nom</b>, <b>prénom</b> et <b>date de naissance</b>"
          values={{ b: bold }}
        />
      </p>
      <p>
        <FormattedMessage
          id="your_trips"
          description="User trips count"
          defaultMessage="{tripCount, plural, =0 {Aucun voyage} one {Votre <b>voyage</b>} other {Vos <b>{tripCount} voyages</b>}}"
          values={{ b: bold, tripCount }}
        />
      </p>
      <p>
        <FormattedMessage
          id="your_trips_and_cards"
          description="User trips count"
          defaultMessage={`
            {tripCount, plural, =0 {Aucun voyage} one {Votre <b>voyage</b>} other {Vos <b>{tripCount} voyages</b>}}
            et
            {cardCount, plural, =0 {aucune carte} one {votre <b>carte</b>} other {vos <b>{cardCount} cartes</b>}}
          `}
          values={{ b: bold, tripCount, cardCount }}
        />
      </p>
    </I18nProvider>
  );
}

I18nMessages.propTypes = {
  userName: PropTypes.string.isRequired,
  tripCount: PropTypes.number.isRequired,
  cardCount: PropTypes.number.isRequired
};
