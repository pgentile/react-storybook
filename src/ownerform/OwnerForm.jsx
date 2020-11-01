import { useReducer, useEffect, useCallback } from "react";
import { Form, useField, useForm } from "react-final-form";
import { debounce } from "lodash-es";

import InputField from "../forms/InputField";
import FinalFieldContainer from "../ff/FinalFieldContainer";
import FinalButton from "../ff/FinalButton";
import sleep from "../utils/sleep";

import "./OwnerForm.scss";

export default function OwnerForm() {
  const onSubmit = async (values) => {
    await sleep(500);

    const { email } = values;
    alert(
      JSON.stringify({
        email,
      })
    );
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <form className="owner-form" onSubmit={handleSubmit} noValidate>
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
    validate: (value) => {
      if (!value) {
        return "Email non défini";
      }
      if (value.indexOf("@") === -1) {
        return "Email invalide";
      }
    },
    validateFields: ["emailValidation"],
  });

  useField("emailValidation", {
    validate: (value, { email, knownEmail }) => {
      if (!knownEmail && value !== email) {
        return "La validation a échouée. Vérifiez votre adresse email dans les deux champs du formulaire.";
      }
    },
  });

  useField("knownEmail", {
    validateFields: ["emailValidation"],
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
        {(props) => <InputField {...props} autoComplete="email" />}
      </FinalFieldContainer>

      <FinalFieldContainer type="email" name="emailValidation" label="Validez votre email" disabled={knownEmail}>
        {(props) => <InputField {...props} />}
      </FinalFieldContainer>

      <FinalButton>Envoyer</FinalButton>
    </>
  );
}

function useEmailCheck() {
  const [state, dispatch] = useReducer(emailCheckReducer, {
    email: "",
    known: false,
  });

  const checkEmail = useCallback(
    debounce((email) => {
      // Simulate a late response
      setTimeout(() => {
        dispatch({
          type: "emailChecked",
          payload: {
            email,
            known: email.endsWith(".com"),
          },
        });
      }, 1000);
    }, 400),
    []
  );

  const changeEmail = useCallback(
    (email) => {
      dispatch({
        type: "changeEmail",
        payload: {
          email,
        },
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
    clearEmail,
  };
}

function emailCheckReducer(state, action) {
  switch (action.type) {
    case "changeEmail": {
      const { email } = action.payload;
      return {
        ...state,
        email,
        known: false,
      };
    }

    case "emailChecked": {
      const { email, known } = action.payload;
      if (state.email !== email) {
        return state;
      }

      return {
        ...state,
        known,
      };
    }

    case "clearEmail": {
      return {
        ...state,
        emaill: "",
        known: false,
      };
    }

    default:
      return state;
  }
}
