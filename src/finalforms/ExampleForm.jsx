import { useState } from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { action } from "@storybook/addon-actions";

import InputField from "../forms/InputField";
import FinalFieldContainer from "../ff/FinalFieldContainer";
import FinalButton from "../ff/FinalButton";

export default function ExampleForm() {
  const [secondField, setSecondField] = useState(true);

  const onFormSubmit = action("onFormSubmit");
  return (
    <Form
      onSubmit={onFormSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <NameField label="Nom 1" validate={validateOnlyNumbers} />
          <div>
            <label>
              <input type="checkbox" checked={secondField} onChange={() => setSecondField((current) => !current)} />{" "}
              Ajouter un second champ
            </label>
          </div>
          {secondField && <NameField label="Nom 2" validate={validateMinLength(5)} />}
          <FinalButton type="submit">Envoyer</FinalButton>
        </form>
      )}
    />
  );
}

ExampleForm.propTypes = {};

function NameField({ label, validate }) {
  return (
    <FinalFieldContainer name="name" label={label}>
      {({ name, id }) => {
        return (
          <Field
            name={name}
            type="text"
            validate={validate}
            render={({ input }) => <InputField id={id} {...input} />}
          />
        );
      }}
    </FinalFieldContainer>
  );
}

NameField.propTypes = {
  label: PropTypes.string.isRequired,
  validate: PropTypes.func.isRequired,
};

function validateMinLength(minLength) {
  return (value) => {
    const length = value?.length ?? 0;
    if (length < minLength) {
      return `Taille minimum : ${minLength} caractères`;
    }
  };
}

function validateOnlyNumbers(value) {
  if (!/^[0-9]*$/.test(value)) {
    return "Seuls des chiffres doivent être acceptés";
  }
}
