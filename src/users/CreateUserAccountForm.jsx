import PropTypes from "prop-types";
import { Form } from "react-final-form";
import createDecorator from "final-form-focus";

import InputField from "../forms/InputField";
import FinalFieldContainer from "../ff/FinalFieldContainer";
import FinalButton from "../ff/FinalButton";

import "./CreateUserAccountForm.scss";

const focusOnErrors = createDecorator();

export default function CreateUserAccountForm({ onCreate }) {
  const onFormSubmit = (formData) => {
    onCreate(formData);
  };

  const validate = (formData) => {
    const errors = {};

    if (!formData.firstname) {
      errors.firstname = "Prénom requis";
    }

    if (!formData.lastname) {
      errors.lastname = "Nom requis";
    }

    if (!formData.email) {
      errors.email = "Email requis";
    } else if (!formData.email?.includes("@")) {
      errors.email = "Email invalide";
    }

    if (!formData.birthdate) {
      errors.birthdate = "Date de naissance requise";
    }

    if (!formData.password) {
      errors.password = "Mot de passe requis";
    }

    if (formData.email !== formData.emailCheck) {
      errors.emailCheck = "Vérifiez les adresses emails";
    }

    if (formData.password !== formData.passwordCheck) {
      errors.passwordCheck = "Vérifiez votre mot de passe";
    }

    return errors;
  };

  return (
    <Form
      validate={validate}
      onSubmit={onFormSubmit}
      decorators={[focusOnErrors]}
      render={({ handleSubmit }) => <CreateUserAccountFormInternal handleSubmit={handleSubmit} />}
    />
  );
}

CreateUserAccountForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

function CreateUserAccountFormInternal({ handleSubmit }) {
  return (
    <form className="create-user-account-form" onSubmit={handleSubmit} noValidate>
      <FinalFieldContainer name="firstname" label="Prénom" className="create-user-account-form__firstname">
        {(props) => <InputField {...props} autoComplete="given-name" />}
      </FinalFieldContainer>

      <FinalFieldContainer name="lastname" label="Nom de famille" className="create-user-account-form__lastname">
        {(props) => <InputField {...props} autoComplete="family-name" />}
      </FinalFieldContainer>

      <FinalFieldContainer name="birthdate" label="Date de naissance" className="create-user-account-form__birthdate">
        {(props) => <InputField {...props} autoComplete="bday" />}
      </FinalFieldContainer>

      <FinalFieldContainer type="email" name="email" label="Email" className="create-user-account-form__email">
        {(props) => <InputField {...props} autoComplete="email" />}
      </FinalFieldContainer>

      <FinalFieldContainer
        type="email"
        name="emailCheck"
        label="Répétez l'email"
        className="create-user-account-form__email-check"
      >
        {(props) => <InputField {...props} autoComplete="email" />}
      </FinalFieldContainer>

      <FinalFieldContainer
        type="password"
        name="password"
        label="Mot de passe"
        className="create-user-account-form__password"
      >
        {(props) => <InputField {...props} />}
      </FinalFieldContainer>

      <FinalFieldContainer
        type="password"
        name="passwordCheck"
        label="Répétez le mot de passe"
        className="create-user-account-form__password-check"
      >
        {(props) => <InputField {...props} />}
      </FinalFieldContainer>

      <div className="create-user-account-form__button">
        <FinalButton size="large" type="submit">
          Créer le compte utilisateur
        </FinalButton>
      </div>
    </form>
  );
}

CreateUserAccountFormInternal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
