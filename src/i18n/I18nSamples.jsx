import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormattedNumberParts, FormattedNumber, FormattedDate } from "react-intl";

import "./I18nSamples.scss";

import { I18nProvider } from "./I18nContext";
import I18nLocaleSelector from "./I18nLocaleSelector";

function loadMessages(/*language*/) {
  return {};
}

export default function I18nSamples(props) {
  return (
    <I18nProvider loadMessages={loadMessages} defaultLocale="fr-FR">
      <I18nLocaleSelector />
      <hr />
      <InternalI18nSamples {...props} />
    </I18nProvider>
  );
}

I18nSamples.propTypes = {
  sampleNumber: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

function InternalI18nSamples({ sampleNumber, currency }) {
  const [date] = useState(() => {
    return new Date(2016, 2 - 1, 18);
  });

  return (
    <>
      <p>
        <b>Number:</b> <FormattedNumber value={sampleNumber} />
      </p>
      <hr />
      <p>
        <b>Currency:</b> <FormattedNumber value={sampleNumber} style="currency" currency={currency} />
      </p>
      <hr />
      <p>
        <b>Date:</b> <FormattedDate value={date} />
      </p>
      <hr />
      <div>
        <p>
          <b>Number parts:</b>
        </p>
        <FormattedNumberParts value={sampleNumber}>{displayParts}</FormattedNumberParts>
      </div>
      <hr />
      <div>
        <p>
          <b>Currency parts:</b>
        </p>
        <FormattedNumberParts value={sampleNumber} currency={currency} style="currency">
          {displayParts}
        </FormattedNumberParts>
      </div>
    </>
  );
}

InternalI18nSamples.propTypes = {
  ...I18nSamples.propTypes,
};

function displayParts(parts) {
  return <pre>{JSON.stringify(parts, undefined, 2)}</pre>;
}
