import React, { useCallback, useState, useEffect, useRef } from "react";
import { Form, useField, useFormState, useForm } from "react-final-form";
import { FORM_ERROR, getIn } from "final-form";
import createDecorator from "final-form-focus";
import { noop } from "lodash-es";
import { FormattedMessage, defineMessages, useIntl } from "react-intl";

import Button from "../buttons/Button";
import InputField from "../forms/InputField";
import FieldContainer from "../forms/FieldContainer";
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
        passengerId: "aaa-111",
        deliveryMode: "eticket"
      },
      {
        passengerId: "bbb-222",
        deliveryMode: "station"
      },
      {
        passengerId: "ccc-333",
        deliveryMode: "station"
      }
    ]
  }));

  const onFormSubmit = useCallback(formData => {
    if (Math.random() < 0.5) {
      return {
        // FIXME No i18n context here
        [FORM_ERROR]: "Impossible d'envoyer le formulaire",
        acceptConditions: "Conditons vraiement acceptées ?"
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
    </I18nProvider>
  );
}

// eslint-disable-next-line react/prop-types
function ContactFormInternal({ handleSubmit }) {
  const { submitFailed, submitError, initialValues } = useFormState({
    subscription: {
      submitFailed: true,
      submitError: true,
      initialValues: true
    }
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        {submitFailed && <p style={{ color: "red" }}>{submitError}</p>}
        <RecipientForm />
        {initialValues.passengers.map((passenger, passengerIndex) => (
          <PassengerForm key={passenger.passengerId} passengerIndex={passengerIndex} />
        ))}
        <AcceptConditionsForm />
        <p>
          <Button>Envoyer</Button>
        </p>
      </form>
      <hr />
      <DebugFormState />
    </>
  );
}

function DebugFormState() {
  const formState = useFormState();

  return <pre>{JSON.stringify(formState, undefined, 2)}</pre>;
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
    <section>
      <h1>
        <FormattedMessage {...messages.recipient} />
      </h1>
      <FieldContainer
        label={formatMessage(messages.firstName)}
        errorMessage={firstName.meta.touched && firstName.meta.invalid ? firstName.meta.error : null}
      >
        {fieldProps => <InputField {...fieldProps} {...firstName.input} />}
      </FieldContainer>
      <FieldContainer
        label={formatMessage(messages.lastName)}
        errorMessage={lastName.meta.touched && lastName.meta.invalid ? lastName.meta.error : null}
      >
        {fieldProps => <InputField {...fieldProps} {...lastName.input} />}
      </FieldContainer>
    </section>
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

  const validateNameIfETicket = (name, allFields) => {
    const deliveryMode = getIn(allFields, `passengers.${passengerIndex}.deliveryMode`);
    if (deliveryMode === "eticket") {
      return validateName(formatMessage)(name);
    }
  };

  const firstName = useField(`passengers.${passengerIndex}.firstName`, {
    validate: validateNameIfETicket
  });

  const lastName = useField(`passengers.${passengerIndex}.lastName`, {
    validate: validateNameIfETicket
  });

  const form = useForm();

  const passengerFirstNameVisited = useVisitedField(`passengers.${passengerIndex}.firstName`);
  const passengerLastNameVisited = useVisitedField(`passengers.${passengerIndex}.lastName`);
  const passengerNameVisited = passengerFirstNameVisited || passengerLastNameVisited;

  useFieldValueListener("recipient.firstName", newValue => {
    if (!passengerNameVisited) {
      form.change(`passengers.${passengerIndex}.firstName`, newValue);
    }
  });

  useFieldValueListener("recipient.lastName", newValue => {
    if (!passengerNameVisited) {
      form.change(`passengers.${passengerIndex}.lastName`, newValue);
    }
  });

  return (
    <section>
      <h1>
        <FormattedMessage {...messages.passengerByIndex} values={{ passengerCount: passengerIndex + 1 }} />
      </h1>
      <p>
        <label>
          <input {...eticketDeliveryMode.input} /> <FormattedMessage {...messages.eTicket} />
        </label>{" "}
        <label>
          <input {...stationDeliveryMode.input} /> <FormattedMessage {...messages.ticketAtStation} />
        </label>
      </p>
      <Expandable expanded={eticketDeliveryMode.input.checked}>
        <FieldContainer
          label={formatMessage(messages.firstName)}
          errorMessage={firstName.meta.touched && firstName.meta.invalid ? firstName.meta.error : null}
        >
          {fieldProps => <InputField {...fieldProps} {...firstName.input} />}
        </FieldContainer>
        <FieldContainer
          label={formatMessage(messages.lastName)}
          errorMessage={lastName.meta.touched && lastName.meta.invalid ? lastName.meta.error : null}
        >
          {fieldProps => <InputField {...fieldProps} {...lastName.input} />}
        </FieldContainer>
      </Expandable>
    </section>
  );
}

// eslint-disable-next-line react/prop-types
function AcceptConditionsForm() {
  const { formatMessage } = useIntl();

  const acceptConditions = useField("acceptConditions", {
    type: "checkbox",
    validate: value => {
      if (!value) {
        return formatMessage(messages.missingAcceptConditions);
      }
    }
  });

  return (
    <section>
      <p>
        <label>
          <input {...acceptConditions.input} /> <FormattedMessage {...messages.acceptConditions} />
        </label>
      </p>
      <p>{acceptConditions.meta.submitFailed && acceptConditions.meta.submitError}</p>
      <p>{acceptConditions.meta.touched && acceptConditions.meta.error}</p>
    </section>
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

function useVisitedField(fieldName) {
  const visitedRef = useRef(false);
  const form = useForm();

  useEffect(() => {
    const unregister = form.registerField(
      fieldName,
      fieldState => {
        visitedRef.current = fieldState.visited;
      },
      {
        visited: true
      }
    );

    return () => unregister();
  }, [form, fieldName]);

  return visitedRef.current;
}

function useFieldValueListener(fieldName, listener) {
  const listenerRef = useRef(listener);
  listenerRef.current = listener;

  const form = useForm();

  useEffect(() => {
    const unregister = form.registerField(
      fieldName,
      fieldState => {
        listenerRef.current(fieldState.value);
      },
      {
        value: true
      }
    );
    return () => unregister();
  }, [form, fieldName]);
}
