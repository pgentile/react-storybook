import { useState } from "react";
import PropTypes from "prop-types";

import Card from "../Card";
import AuthAskPassword from "./AuthAskPassword";
import AuthIKnowYou from "./AuthIKnowYou";

import "./AuthWidget.scss";

export default function AuthWidget({ onValidate }) {
  const [askPassword, setAskPassword] = useState(false);

  const onConnectClick = () => setAskPassword(true);
  const onCancelClick = () => setAskPassword(false);

  return (
    <Card className="auth-widget" layer="flat">
      {askPassword ? (
        <AuthAskPassword onCancelClick={onCancelClick} onValidate={onValidate} />
      ) : (
        <AuthIKnowYou onConnectClick={onConnectClick} />
      )}
    </Card>
  );
}

AuthWidget.propTypes = {
  onValidate: PropTypes.func.isRequired,
};

AuthWidget.defaultProps = {};
