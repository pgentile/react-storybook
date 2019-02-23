import React from "react";
import PropTypes from "prop-types";

import { useFormInput, useRadio, useCheckbox } from "./forms";

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
  const firstName = useFormInput("firstName", {
    validate: validateName
  });

  const lastName = useFormInput("lastName", {
    validate: validateName
  });

  const acceptConditions = useCheckbox("acceptConditions", {
    validate: validateChecked
  });

  const civility = useRadio("civility", {
    validate: validateNotEmpty
  });

  const onSubmit = event => {
    event.preventDefault();

    console.info("Form content", {
      firstName: firstName.value,
      lastName: lastName.value,
      civility: civility.value
    });
  };

  return (
    <form onSubmit={onSubmit}>
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
      <Row>{civility.valid && firstName.valid && lastName.valid && acceptConditions.valid ? "VALID" : "INVALID"}</Row>
    </form>
  );
}

const InputContainer = function InputContainer({ valid, touched, children }) {
  return (
    <div className="input-container">
      <div>{children}</div>
      {touched && !valid ? <div>Invalid</div> : null}
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
