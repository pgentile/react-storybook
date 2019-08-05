import React from "react";
import PropTypes from "prop-types";
import { withFormik, Formik } from "formik";

import FieldContainer from "../forms/FieldContainer";
import InputField from "../forms/InputField";
import DateInput from "../forms/DateInput";
import { withFormFocusOnError } from "../forms/FormFocusOnError";
import Button from "../buttons/Button";

import "./CreateUserAccountForm.scss";

class CreateUserAccountForm extends React.PureComponent {
  static propTypes = {
    ...Formik.propTypes,
    className: PropTypes.string,
    onCreate: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: ""
  };

  render() {
    const {
      className,
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      setFieldValue,
      setFieldTouched
    } = this.props;
    const disableForm = isSubmitting;

    return (
      <form className={`create-user-account-form ${className}`} onSubmit={handleSubmit} noValidate>
        <FieldContainer
          label="Prénom"
          className="create-user-account-form__firstname"
          disabled={disableForm}
          errorMessage={touched.firstname && errors.firstname}
        >
          {props => (
            <InputField
              {...props}
              name="firstname"
              autoComplete="given-name"
              value={values.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </FieldContainer>

        <FieldContainer
          label="Nom de famille"
          className="create-user-account-form__lastname"
          disabled={disableForm}
          errorMessage={touched.lastname && errors.lastname}
        >
          {props => (
            <InputField
              {...props}
              name="lastname"
              autoComplete="family-name"
              value={values.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </FieldContainer>

        <FieldContainer
          label="Date de naissance"
          className="create-user-account-form__birthdate"
          disabled={disableForm}
          errorMessage={touched.birthdate && errors.birthdate}
        >
          {props => (
            <DateInput
              {...props}
              name="birthdate"
              value={values.birthdate}
              autoComplete={{ year: "bday-year", month: "bday-month", day: "bday-day" }}
              onChange={value => setFieldValue("birthdate", value)}
              onBlur={() => setFieldTouched("birthdate", true)}
            />
          )}
        </FieldContainer>

        <FieldContainer
          label="Email"
          className="create-user-account-form__email"
          disabled={disableForm}
          errorMessage={touched.email && errors.email}
        >
          {props => (
            <InputField
              {...props}
              type="email"
              name="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </FieldContainer>

        <FieldContainer
          label="Répétez l'email"
          className="create-user-account-form__email-check"
          disabled={disableForm}
          errorMessage={touched.emailCheck && errors.emailCheck}
        >
          {props => (
            <InputField
              {...props}
              type="email"
              name="emailCheck"
              autoComplete="email"
              value={values.emailCheck}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </FieldContainer>

        <FieldContainer
          label="Mot de passe"
          className="create-user-account-form__password"
          disabled={disableForm}
          errorMessage={touched.password && errors.password}
        >
          {props => (
            <InputField
              {...props}
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </FieldContainer>

        <FieldContainer
          label="Répétez le mot de passe"
          className="create-user-account-form__password-check"
          disabled={disableForm}
          errorMessage={touched.passwordCheck && errors.passwordCheck}
        >
          {props => (
            <InputField
              {...props}
              type="password"
              name="passwordCheck"
              value={values.passwordCheck}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </FieldContainer>

        <div className="create-user-account-form__button">
          <Button size="large" type="submit" disabled={disableForm}>
            Créer le compte utilisateur
          </Button>
        </div>
      </form>
    );
  }
}

export default withFormFocusOnError()(
  withFormik({
    mapPropsToValues: () => ({
      firstname: "",
      lastname: "",
      birthdate: "",
      email: "",
      emailCheck: "",
      password: "",
      passwordCheck: ""
    }),
    validate: (values, props) => {
      const errors = {};

      if (!values.firstname) {
        errors.firstname = "Prénom requis";
      }

      if (!values.lastname) {
        errors.lastname = "Nom requis";
      }

      if (!values.email) {
        errors.email = "Email requis";
      }
      if (!values.email.includes("@")) {
        errors.email = "Email invalide";
      }

      if (!values.birthdate) {
        errors.birthdate = "Date de naissance requise";
      }

      if (!values.password) {
        errors.password = "Mot de passe requis";
      }

      if (values.email !== values.emailCheck) {
        errors.emailCheck = "Vérifiez les adresses emails";
      }

      if (values.password !== values.passwordCheck) {
        errors.passwordCheck = "Vérifiez votre mot de passe";
      }

      if (Object.keys(errors).length > 0) {
        props.focusOnError();
      }

      return errors;
    },
    handleSubmit: async (values, { props, setSubmitting }) => {
      try {
        await props.onCreate(values);
      } finally {
        setSubmitting(false);
      }
    }
  })(CreateUserAccountForm)
);
