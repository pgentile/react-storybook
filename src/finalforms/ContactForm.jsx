/* eslint-disable prettier/prettier */
import React, { useCallback, useState } from "react";
import { Form, useField, useFormState } from "react-final-form";
import { FORM_ERROR } from "final-form";
import createDecorator from "final-form-focus";
import { noop } from "lodash-es";
import { FormattedMessage, defineMessages, useIntl } from "react-intl";

import Button from "../buttons/Button";
import InputField from "../forms/InputField";
import { I18nProvider } from "../i18n/I18nContext";
import Expandable from "../Expandable";

import "./ContactForm.scss";

const focusOnErrors = createDecorator();

export default function ContactForm() {
  const [contactInfos, setContactInfos] = useState(() => ({
    recipient: {
      firstName: "Jean",
      lastName: "Bon"
    },
    passengers: [
      {
        deliveryMode: "eticket"
      },
      {
        deliveryMode: "station"
      }
    ]
  }));

  const onFormSubmit = useCallback(formData => {
    if (!formData.acceptConditions) {
      return {
        // FIXME No i18n context here
        [FORM_ERROR]: messages.missingAcceptConditions.defaultMessage,
        "acceptConditions": messages.missingAcceptConditions.defaultMessage
      };
    }

    setContactInfos(formData);
  }, []);

  const render = useCallback(({ handleSubmit }) => {
    return <ContactFormInternal handleSubmit={handleSubmit} />;
  }, []);

  return (
    <I18nProvider defaultLocale="fr-FR" loadMessages={noop}>
      <Form onSubmit={onFormSubmit} decorators={[focusOnErrors]} initialValues={contactInfos} render={render} />
      <hr />
      <pre>{JSON.stringify(contactInfos, undefined, 2)}</pre>
    </I18nProvider>
  );
}

// eslint-disable-next-line react/prop-types
function ContactFormInternal({ handleSubmit }) {
  const { submitFailed, submitError } = useFormState({
    subscription: {
      submitFailed: true,
      submitError: true
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      {submitFailed && <p style={{ color: "red" }}>{submitError}</p>}
      <RecipientForm />
      <PassengerForm passengerIndex={0} />
      <PassengerForm passengerIndex={1} />
      <AcceptConditionsForm />
      <p>
        <Button>Envoyer</Button>
      </p>
    </form>
  );
}

function RecipientForm() {
  const { formatMessage } = useIntl();

  const firstName = useField("recipient.firstName", {
    validate: validateName(formatMessage)
  });

  const lastName = useField("recipient.lastName", {
    validate: validateName(formatMessage)
  });

  return (
    <>
      <FormattedMessage {...messages.recipient} />
      <p>
        <InputField
          {...firstName.input}
          placeholder={formatMessage(messages.firstName)}
          error={Boolean(firstName.meta.touched && firstName.meta.error)}
        />
      </p>
      <p>{firstName.meta.touched && firstName.meta.error}</p>
      <p>
        <InputField
          {...lastName.input}
          placeholder={formatMessage(messages.lastName)}
          error={Boolean(lastName.meta.invalid && lastName.meta.touched && lastName.meta.error)}
        />
      </p>
      <p>{lastName.meta.touched && lastName.meta.error}</p>
    </>
  );
}

// eslint-disable-next-line react/prop-types
function PassengerForm({ passengerIndex }) {
  const { formatMessage } = useIntl();

  const deliveryModeFieldName = `passengers.${passengerIndex}.deliveryMode`;
  const eticketDeliveryMode = useField(deliveryModeFieldName, {
    type: "radio",
    value: "eticket"
  });
  const stationDeliveryMode = useField(deliveryModeFieldName, {
    type: "radio",
    value: "station"
  });

  const validateNameIfETicket = useCallback(
    (name, allFields) => {
      const deliveryMode = allFields.passengers[passengerIndex].deliveryMode;
      if (deliveryMode === "eticket") {
        return validateName(formatMessage)(name);
      }
    },
    [formatMessage, passengerIndex]
  );

  const firstName = useField(`passengers.${passengerIndex}.firstName`, {
    validate: validateNameIfETicket
  });

  const lastName = useField(`passengers.${passengerIndex}.lastName`, {
    validate: validateNameIfETicket
  });

  return (
    <>
      <FormattedMessage {...messages.passengerByIndex} values={{ passengerCount: passengerIndex + 1 }} />
      <p>
        <label>
          <input {...eticketDeliveryMode.input} />
          {" "}
          <FormattedMessage {...messages.eTicket} />
        </label>
        {" "}
        <label>
          <input {...stationDeliveryMode.input} />
          {" "}
          <FormattedMessage {...messages.ticketAtStation} />
        </label>
      </p>
      <Expandable expanded={eticketDeliveryMode.input.checked}>
        <p>
          <InputField
            {...firstName.input}
            placeholder={formatMessage(messages.firstName)}
            error={Boolean(firstName.meta.touched && firstName.meta.error)}
          />
        </p>
        <p>{firstName.meta.touched && firstName.meta.error}</p>
        <p>
          <InputField
            {...lastName.input}
            placeholder={formatMessage(messages.lastName)}
            error={Boolean(lastName.meta.touched && lastName.meta.error)}
          />
        </p>
        <p>{lastName.meta.touched && lastName.meta.error}</p>
      </Expandable>
    </>
  );
}

// eslint-disable-next-line react/prop-types
function AcceptConditionsForm() {
  const acceptConditions = useField("acceptConditions", {
    type: "checkbox"
  });

  return (
    <>
      <p>
        <label>
          <input
            {...acceptConditions.input}
            error={Boolean(acceptConditions.meta.touched && acceptConditions.meta.error)}
          />
          {" "}
          <FormattedMessage {...messages.acceptConditions} />
        </label>
      </p>
      <p>{acceptConditions.meta.submitFailed && acceptConditions.meta.submitError}</p>
      <p>{acceptConditions.meta.touched && acceptConditions.meta.error}</p>
    </>
  );
}

function validateName(formatMessage) {
  return name => {
    if (!name) {
      return formatMessage(messages.nameCantBeEmpty);
    }
    if (name.length < 2) {
      return formatMessage(messages.nameTooSmall);
    }
    if (name.lenth > 30) {
      return formatMessage(messages.nameTooLong);
    }
  };
}

/* eslint-disable formatjs/enforce-placeholders */
const messages = defineMessages({
  firstName: {
    id: "firstName",
    defaultMessage: "Prénom"
  },
  lastName: {
    id: "lastName",
    defaultMessage: "Nom"
  },
  passengerByIndex: {
    id: "passenger.byIndex",
    defaultMessage: "Passager n°{passengerCount}"
  },
  recipient: {
    id: "recipient",
    defaultMessage: "Récepteur"
  },
  nameCantBeEmpty: {
    id: "nameCantBeEmpty",
    defaultMessage: "Le nom ne peut pas être vide"
  },
  nameTooSmall: {
    id: "nameTooSmall",
    defaultMessage: "Nom trop petit"
  },
  nameTooLong: {
    id: "nameTooLong",
    defaultMessage: "Nom trop long"
  },
  eTicket: {
    id: "ticket.eticket",
    defaultMessage: "Billet électronique"
  },
  ticketAtStation: {
    id: "ticket.atStation",
    defaultMessage: "Billet en gare"
  },
  acceptConditions: {
    id: "acceptConditions",
    defaultMessage: "Accepter les conditions de vente"
  },
  missingAcceptConditions: {
    id: "missingAcceptConditions",
    defaultMessage: "Vous devez accepter les conditions de vente"
  }
});
/* eslint-enable formatjs/enforce-placeholders */
