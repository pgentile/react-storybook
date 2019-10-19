import React from "react";
import PropTypes from "prop-types";

import { useForm, useFormInput, useRadio, useCheckbox } from "./forms";
import bemModifiers from "../utils/bemModifiers";

import "./HookedForm.scss";

function validateNotEmpty(value) {
  return !!value;
}

function validateChecked(checked) {
  return checked;
}

function validateName(name) {
  return name.length >= 2;
}

export default function HookedForm() {
  const onSubmit = (event, data) => {
    console.info("Submitting form");

    event.preventDefault();

    console.info("Form content", data);
  };

  const form = useForm({
    onSubmit
  });

  const firstName = useFormInput("firstName", {
    form,
    validate: validateName
  });

  const lastName = useFormInput("lastName", {
    form,
    validate: validateName
  });

  const acceptConditions = useCheckbox("acceptConditions", {
    form,
    validate: validateChecked
  });

  const civility = useRadio("civility", {
    form,
    validate: validateNotEmpty
  });

  return (
    <form onSubmit={form.onSubmit}>
      <InputContainer {...civility}>
        <Row>
          <label>
            <input type="radio" {...civility.propsFor("MR")} /> Monsieur
          </label>{" "}
          <label>
            <input type="radio" {...civility.propsFor("MRS")} /> Madame
          </label>
        </Row>
      </InputContainer>
      <InputContainer {...firstName}>
        <Row>
          <label>
            Prénom : <input type="text" {...firstName.props} />
          </label>
        </Row>
      </InputContainer>
      <InputContainer {...lastName}>
        <Row>
          <label>
            Nom : <input type="text" {...lastName.props} />
          </label>
        </Row>
      </InputContainer>
      <InputContainer {...acceptConditions}>
        <Row>
          <label>
            <input type="checkbox" {...acceptConditions.props} /> Accept conditions
          </label>
        </Row>
      </InputContainer>
      <Row>
        <button type="submit">Send</button>
      </Row>
    </form>
  );
}

const InputContainer = function InputContainer({ valid, touched, children }) {
  const error = touched && !valid;

  const className = bemModifiers("input-container", {
    error
  });

  return (
    <div className={className}>
      <div>{children}</div>
    </div>
  );
};

InputContainer.propTypes = {
  valid: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

const Row = function Row({ children, className = "", ...otherProps }) {
  return (
    <div className={"row " + className} {...otherProps}>
      {children}
    </div>
  );
};

Row.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};
