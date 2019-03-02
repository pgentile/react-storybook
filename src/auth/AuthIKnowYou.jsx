import React from "react";
import PropTypes from "prop-types";

import "./AuthIKnowYou.scss";

import Button from "../buttons/Button";

export default function AuthIKnowYou({ onConnectClick }) {
  return (
    <div className="auth-iknowyou">
      <div className="auth-iknowyou__punchline">On se connait&nbsp;?</div>
      <div className="auth-iknowyou__button">
        <Button onClick={onConnectClick}>Me connecter</Button>
      </div>
    </div>
  );
}

AuthIKnowYou.propTypes = {
  onConnectClick: PropTypes.func.isRequired
};

AuthIKnowYou.defaultProps = {};
