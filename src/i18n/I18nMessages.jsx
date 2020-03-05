import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

import { I18nProvider } from "./I18nContext";
import I18nLocaleSelector from "./I18nLocaleSelector";
import sleep from "../utils/sleep";

function b(...chunks) {
  return <strong>{chunks}</strong>;
}

async function loadMessages(locale) {
  let messages = {};
  if (locale === "en") {
    await sleep(500);

    messages = {
      hello: "Hello, {userName}!",
      "hello.formatted": "Hello, <b>{userName}</b>!",
      personal_infos: "Enter your <b>last name</b>, <b>first name</b> and <b>birthdate</b>",
      your_trips: `
        {tripCount, plural, =0 {No trip} one {Your <b>trip</b>} other {Your <b># trips</b>}}
      `,
      your_trips_and_cards: `
        {tripCount, plural, =0 {No trip} one {Your <b>trip</b>} other {Your <b># trips</b>}}
        and
        {cardCount, plural, =0 {no card} one {your <b>card</b>} other {your <b># cards</b>}}
      `,
      recipient_with_gender: `
        {gender, select, female {She} other {He}}
        will receive
        {gender, select, female {her} other {his}}
        {tripCount, plural, one {ticket} other {# tickets}}
        in a couple of days.
        {gender, select, female {Her} other {His}}
        {tripCount, plural, one {ticket} other {tickets}}
        will be delivered by post.
      `
    };
  }

  return messages;
}

export default function I18nMessages({ userName, tripCount, cardCount, gender }) {
  return (
    <I18nProvider loadMessages={loadMessages} defaultLocale="fr-FR">
      <I18nLocaleSelector />
      <p>
        <FormattedMessage
          id="hello"
          description="Hello"
          defaultMessage="Salut, {userName}&nbsp;!"
          values={{ userName: <em>{userName}</em> }}
        />
      </p>
      <p>
        <FormattedMessage
          id="hello.formatted"
          description="Hello"
          defaultMessage="Salut, <b>{userName}</b>&nbsp;!"
          values={{
            b,
            userName
          }}
        />
      </p>
      <p>
        <FormattedMessage
          id="personal_infos"
          description="Ask user its personal informations"
          defaultMessage="Entrez vos <b>nom</b>, <b>prénom</b> et <b>date de naissance</b>"
          values={{ b }}
        />
      </p>
      <p>
        <FormattedMessage
          id="your_trips"
          description="User trips count"
          defaultMessage="{tripCount, plural, =0 {Aucun voyage} one {Votre <b>voyage</b>} other {Vos <b># voyages</b>}}"
          values={{ b, tripCount }}
        />
      </p>
      <p>
        <FormattedMessage
          id="your_trips_and_cards"
          description="User trips count"
          defaultMessage={`
            {tripCount, plural, =0 {Aucun voyage} one {Votre <b>voyage</b>} other {Vos <b># voyages</b>}}
            et
            {cardCount, plural, =0 {aucune carte} one {votre <b>carte</b>} other {vos <b># cartes</b>}}
          `}
          values={{ b, tripCount, cardCount }}
        />
      </p>
      {tripCount > 0 && (
        <p>
          <FormattedMessage
            id="recipient_with_gender"
            description="Recipient with gender"
            defaultMessage={`
            {gender, select, female {Elle} other {Il}}
            recevra
            {tripCount, plural, one {son billet} other {ses # billets}}
            dans une dizaine de jours.
            {tripCount, plural, one {Son billet} other {Ses billets}}
            lui
            {tripCount, plural, one {sera} other {seront}}
            remis par courrier.
          `}
            values={{ gender, tripCount }}
          />
        </p>
      )}
    </I18nProvider>
  );
}

I18nMessages.propTypes = {
  userName: PropTypes.string.isRequired,
  tripCount: PropTypes.number.isRequired,
  cardCount: PropTypes.number.isRequired,
  gender: PropTypes.oneOf(["male", "female"]).isRequired
};
