import React, { Fragment } from "react";
import { action } from "@storybook/addon-actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcVisa, faCcMastercard, faCcAmex } from "@fortawesome/free-brands-svg-icons";

import CheckableImageInput from "./CheckableImageInput";

const actions = {
  onClick: action("click"),
  onChange: action("change"),
  onKeyPress: action("key press"),
};

export default {
  title: "Forms / CheckableImageInput",
  component: CheckableImageInput,
};

export const unchecked = () => {
  return (
    <CheckableImageInput {...actions} label="Visa">
      <FontAwesomeIcon icon={faCcVisa} size="2x" />
    </CheckableImageInput>
  );
};

export const checked = () => {
  return (
    <CheckableImageInput checked {...actions} label="Visa">
      <FontAwesomeIcon icon={faCcVisa} size="2x" />
    </CheckableImageInput>
  );
};

export const disabled = () => {
  return (
    <CheckableImageInput disabled {...actions} label="Visa">
      <FontAwesomeIcon icon={faCcVisa} size="2x" />
    </CheckableImageInput>
  );
};

export const disabledAndChecked = () => {
  return (
    <CheckableImageInput disabled checked {...actions} label="Visa">
      <FontAwesomeIcon icon={faCcVisa} size="2x" />
    </CheckableImageInput>
  );
};

export const readOnly = () => {
  return (
    <CheckableImageInput readOnly {...actions} label="Visa">
      <FontAwesomeIcon icon={faCcVisa} size="2x" />
    </CheckableImageInput>
  );
};

export const many = () => {
  return (
    <Fragment>
      <CheckableImageInput checked {...actions} label="Visa">
        <FontAwesomeIcon icon={faCcVisa} size="2x" />
      </CheckableImageInput>
      <CheckableImageInput {...actions} label="Mastercard">
        <FontAwesomeIcon icon={faCcMastercard} size="2x" />
      </CheckableImageInput>
      <CheckableImageInput {...actions} label="AMEX">
        <FontAwesomeIcon icon={faCcAmex} size="2x" />
      </CheckableImageInput>
    </Fragment>
  );
};
