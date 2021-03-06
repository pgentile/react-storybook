import PropTypes from "prop-types";
import { FormattedList, FormattedMessage } from "react-intl";

import { I18nProvider, useLocale } from "./I18nContext";
import I18nLocaleSelector from "./I18nLocaleSelector";
import sleep from "../utils/sleep";

async function loadMessages(language) {
  let messages = {};
  if (language === "en") {
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
      `,
      terms_of_service: `
        If you validate this page, this means that you accept
        our <termsOfServiceLink>terms of service</termsOfServiceLink>.
      `,
    };
  }

  return messages;
}

export default function I18nMessages({ userName, tripCount, cardCount, gender }) {
  const items = [
    tripCount && (
      <FormattedMessage
        key="trip"
        id="trip"
        defaultMessage="{tripCount, plural, =0 {aucun voyage} one {votre voyage} other {vos # voyages}}"
        description="Trip"
        values={{ tripCount }}
      />
    ),
    cardCount && (
      <FormattedMessage
        key="card"
        id="card"
        defaultMessage="{cardCount, plural, =0 {aucune carte} one {votre carte} other {vos # cartes}}"
        description="Card"
        values={{ cardCount }}
      />
    ),
  ].filter((item) => Boolean(item));

  return (
    <I18nProvider loadMessages={loadMessages} defaultLocale="fr-FR" defaultRichTextElements={{ b }}>
      <I18nLocaleSelector />
      <p>
        <FormattedList type="unit" value={items} />
      </p>
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
          // eslint-disable-next-line formatjs/enforce-placeholders
          defaultMessage="Salut, <b>{userName}</b>&nbsp;!"
          values={{ userName }}
        />
      </p>
      <p>
        <FormattedMessage
          id="personal_infos"
          description="Ask user its personal informations"
          // eslint-disable-next-line formatjs/enforce-placeholders
          defaultMessage="Entrez vos <b>nom</b>, <b>prénom</b> et <b>date de naissance</b>"
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
      <p>
        <FormattedMessage
          id="terms_of_service"
          description="Terms of service"
          defaultMessage={`
          En validant la page, vous acceptez nos
          <termsOfServiceLink>conditions générales d'utilisation</termsOfServiceLink>.
        `}
          values={{ termsOfServiceLink }}
        />
      </p>
    </I18nProvider>
  );
}

I18nMessages.propTypes = {
  userName: PropTypes.string.isRequired,
  tripCount: PropTypes.number.isRequired,
  cardCount: PropTypes.number.isRequired,
  gender: PropTypes.oneOf(["male", "female"]).isRequired,
};

function b(chunks) {
  return <strong>{chunks}</strong>;
}

function termsOfServiceLink(chunks) {
  return <TermsOfServiceLink>{chunks}</TermsOfServiceLink>;
}

function TermsOfServiceLink({ children }) {
  const { locale } = useLocale();
  const [lang, country] = locale.split("-", 2);

  const hostPrefix = country === "FR" ? "www" : country.toLowerCase();
  const pathEnd = "content/cgu.html";
  const path = country === "FR" ? [pathEnd] : [lang, pathEnd];
  const url = `https://${hostPrefix}.example.org/${path.join("/")}`;

  return <a href={url}>{children}</a>;
}

TermsOfServiceLink.propTypes = {
  children: PropTypes.node,
};
