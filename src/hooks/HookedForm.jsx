import React, { memo, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import noop from "lodash-es";

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

const InputContainer = memo(function InputContainer({ valid, touched, children }) {
  return (
    <div className="input-container">
      <div>{children}</div>
      {touched && !valid ? <div>Invalid</div> : null}
    </div>
  );
});

InputContainer.propTypes = {
  valid: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

const Row = memo(function Row({ children, className = "", ...otherProps }) {
  return (
    <div className={"row " + className} {...otherProps}>
      {children}
    </div>
  );
});

Row.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

function defaultValidate() {
  return true;
}

function useFormInput(name, { defaultValue = "", validate = defaultValidate } = {}) {
  const [value, setValue] = useState(defaultValue);
  const { touched, touch } = useTouched();

  const valid = useMemo(
    () => {
      return validate(value);
    },
    [validate, value]
  );

  const props = useMemo(
    () => {
      return {
        name,
        value,

        onChange(event) {
          setValue(event.target.value);
        },

        onBlur() {
          touch();
        }
      };
    },
    [name, value, touched]
  );

  return {
    type: "input",
    name,
    value,
    hasValue: !!value,
    touched,
    valid,
    props
  };
}

function useCheckbox(name, { defaultChecked = false, validate = defaultValidate } = {}) {
  const [checked, setChecked] = useState(defaultChecked);
  const { touched, touch } = useTouched();

  const valid = useMemo(() => validate(checked), [validate, checked]);

  const props = useMemo(
    () => {
      return {
        name,
        checked,

        onChange(event) {
          setChecked(event.target.checked);
          touch();
        }
      };
    },
    [name, checked, touched]
  );

  return {
    type: "checkbox",
    name,
    checked,
    touched,
    valid,
    props
  };
}

function useRadio(name, { defaultValue = "", validate = defaultValidate } = {}) {
  const [value, setValue] = useState(defaultValue);
  const { touched, touch } = useTouched();

  const valid = useMemo(() => validate(value), [validate, value]);

  const propsFor = useCallback(
    targetValue => {
      return {
        name,
        value: targetValue,
        checked: targetValue === value,

        onChange(event) {
          setValue(event.target.value);
          touch();
        }
      };
    },
    [name, value, touched]
  );

  return {
    type: "radio",
    name,
    valid,
    value,
    hasValue: !!value,
    touched,
    propsFor
  };
}

function useTouched() {
  const [touched, setTouched] = useState(false);

  let touch = noop;
  if (!touched) {
    touch = () => setTouched(true);
  }

  return {
    touched,
    touch
  };
}
