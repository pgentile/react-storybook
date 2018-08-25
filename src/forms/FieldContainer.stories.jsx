import React from "react";
import { storiesOf } from "@storybook/react";

import FieldContainer from "./FieldContainer";
import InputField from "./InputField";

function innerField(props) {
  return <InputField {...props} placeholder="Valeur d'exemple" />;
}

storiesOf("Forms / FieldContainer", module)
  .add("main", () => {
    return <FieldContainer label="Example">{innerField}</FieldContainer>;
  })
  .add("Avec erreur", () => {
    return (
      <FieldContainer label="Example" errorMessage="Nom inconnu">
        {innerField}
      </FieldContainer>
    );
  })
  .add("Avec aide", () => {
    return (
      <FieldContainer label="Example" helpMessage="Un peu d'aide, ça ne fait pas de mal">
        {innerField}
      </FieldContainer>
    );
  })
  .add("Avec erreur et aide", () => {
    return (
      <FieldContainer label="Example" errorMessage="Données invalides" helpMessage="Aide">
        {innerField}
      </FieldContainer>
    );
  })
  .add("Désactivé", () => {
    return (
      <FieldContainer label="Example" disabled>
        {innerField}
      </FieldContainer>
    );
  })
  .add("Lecture seule", () => {
    return (
      <FieldContainer label="Example" readOnly>
        {innerField}
      </FieldContainer>
    );
  });
