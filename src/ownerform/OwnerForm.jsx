import React, { useReducer, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Form, useField, useForm, useFormState } from "react-final-form";
import { debounce } from "lodash-es";

import FieldContainer from "../forms/FieldContainer";
import InputField from "../forms/InputField";
import Button from "../buttons/Button";
import sleep from "../utils/sleep";

import "./OwnerForm.scss";

export default function OwnerForm() {
  const onSubmit = async values => {
    await sleep(500);

    const { email } = values;
    alert(
      JSON.stringify({
        email
      })
    );
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <form className="owner-form" onSubmit={handleSubmit}>
            <InternalOwnerForm />
          </form>
        );
      }}
    ></Form>
  );
}

function InternalOwnerForm() {
  const form = useForm();

  const email = useField("email", {
    validate: value => {
      if (!value) {
        return "Email non défini";
      }
      if (value.indexOf("@") === -1) {
        return "Email invalide";
      }
    },
    validateFields: ["emailValidation"]
  });

  useField("emailValidation", {
    validate: (value, { email, knownEmail }) => {
      if (!knownEmail && value !== email) {
        return "La validation a échouée. Vérifiez votre adresse email dans les deux champs du formulaire.";
      }
    }
  });

  useField("knownEmail", {
    validateFields: ["emailValidation"]
  });

  const { changeEmail, clearEmail, known: knownEmail } = useEmailCheck();

  const emailValue = email.input.value;
  const emailValid = email.meta.valid;

  useEffect(() => {
    if (emailValid) {
      changeEmail(emailValue);
    } else {
      clearEmail();
    }
  }, [emailValue, emailValid, changeEmail, clearEmail]);

  useEffect(() => {
    form.change("knownEmail", knownEmail);
  }, [form, knownEmail]);

  return (
    <>
      <FinalFieldContainer type="email" name="email" label="Email">
        {props => <InputField {...props} autoComplete="email" />}
      </FinalFieldContainer>

      <FinalFieldContainer type="email" name="emailValidation" label="Validez votre email" disabled={knownEmail}>
        {props => <InputField {...props} />}
      </FinalFieldContainer>

      <FinalButton>Envoyer</FinalButton>
    </>
  );
}

function useEmailCheck() {
  const [state, dispatch] = useReducer(emailCheckReducer, {
    email: "",
    known: false
  });

  const checkEmail = useCallback(
    debounce(email => {
      console.info("Validating email:", email);

      // Simulate a late response
      setTimeout(() => {
        dispatch({
          type: "emailChecked",
          payload: {
            email,
            known: email.endsWith(".com")
          }
        });
      }, 500);
    }, 200),
    []
  );

  const changeEmail = useCallback(
    email => {
      dispatch({
        type: "changeEmail",
        payload: {
          email
        }
      });

      checkEmail(email);
    },
    [checkEmail]
  );

  const clearEmail = useCallback(() => {
    dispatch({ type: "clearEmail", payload: {} });
  }, []);

  const { known } = state;

  return {
    known,
    changeEmail,
    clearEmail
  };
}

function emailCheckReducer(state, action) {
  switch (action.type) {
    case "changeEmail": {
      const { email } = action.payload;
      return {
        ...state,
        email,
        known: false
      };
    }

    case "emailChecked": {
      const { email, known } = action.payload;
      if (state.email !== email) {
        return state;
      }

      return {
        ...state,
        known
      };
    }

    case "clearEmail": {
      return {
        ...state,
        emaill: "",
        known: false
      };
    }

    default:
      return state;
  }
}

function FinalFieldContainer({ type = "text", name, label, children, disabled = false }) {
  const field = useField(name, {
    type,
    subscription: {
      value: true,
      error: true,
      submitError: true,
      submitting: true,
      touched: true,
      pristine: true
    }
  });

  return (
    <FieldContainer label={label} disabled={disabled || field.meta.submitting} errorMessage={getFieldError(field)}>
      {props => children({ ...field.input, ...props })}
    </FieldContainer>
  );
}

FinalFieldContainer.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  children: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

function FinalButton({ disabled, ...otherProps }) {
  const { submitting } = useFormState({
    subscription: {
      submitting: true
    }
  });

  return <Button {...otherProps} disabled={disabled || submitting} />;
}

FinalButton.propTypes = {
  disabled: PropTypes.bool
};

function getFieldError(field) {
  const { touched, error, submitError, pristine } = field.meta;
  if (touched && error) {
    return error;
  }
  if (submitError && pristine) {
    return submitError;
  }
}
