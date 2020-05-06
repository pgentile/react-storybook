import React from "react";

import FieldContainer from "./FieldContainer";
import InputField from "./InputField";

function innerField(props) {
  return <InputField {...props} placeholder="Valeur d'exemple" />;
}

export default {
  title: "Forms / FieldContainer",
  component: FieldContainer,
};

export const main = () => {
  return <FieldContainer label="Example">{innerField}</FieldContainer>;
};

export const error = () => {
  return (
    <FieldContainer label="Example" errorMessage="Nom inconnu">
      {innerField}
    </FieldContainer>
  );
};

export const help = () => {
  return (
    <FieldContainer label="Example" helpMessage="Un peu d'aide, ça ne fait pas de mal">
      {innerField}
    </FieldContainer>
  );
};

export const errorAndHelp = () => {
  return (
    <FieldContainer label="Example" errorMessage="Données invalides" helpMessage="Aide">
      {innerField}
    </FieldContainer>
  );
};

export const disabled = () => {
  return (
    <FieldContainer label="Example" disabled>
      {innerField}
    </FieldContainer>
  );
};

export const customLabelElement = () => {
  return (
    <FieldContainer label="Example" labelElement="span" optional>
      {innerField}
    </FieldContainer>
  );
};
