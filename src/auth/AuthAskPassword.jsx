import { useState } from "react";
import PropTypes from "prop-types";

import Button from "../buttons/Button";
import InputField from "../forms/InputField";
import Label from "../forms/Label";
import useRandomId from "./useRandomId";

import "./AuthAskPassword.scss";

export default function AuthAskPassword({ onCancelClick, onValidate }) {
  const [password, setPassword] = useState("");
  const passwordFieldId = useRandomId();

  const onPasswordChange = (event) => setPassword(event.target.value);

  const onValidateClick = () => onValidate({ password });

  return (
    <div className="auth-askpassword">
      <div className="auth-askpassword__password">
        <Label className="auth-askpassword__password-label" htmlFor={passwordFieldId}>
          Mot de passe
        </Label>
        <InputField
          className="auth-askpassword__password-field"
          id={passwordFieldId}
          type="password"
          autoFocus
          value={password}
          onChange={onPasswordChange}
        />
        <Button className="auth-askpassword__validate-button" disabled={!password} onClick={onValidateClick}>
          Valider
        </Button>
      </div>
      <div className="auth-askpassword__cancel">
        <Button onClick={onCancelClick}>Annuler</Button>
      </div>
    </div>
  );
}

AuthAskPassword.propTypes = {
  onCancelClick: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
};

AuthAskPassword.defaultProps = {};
