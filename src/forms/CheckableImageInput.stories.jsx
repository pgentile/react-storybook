import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcVisa, faCcMastercard, faCcAmex } from "@fortawesome/free-brands-svg-icons";

import CheckableImageInput from "./CheckableImageInput";

const actions = {
  onClick: action("click"),
  onChange: action("change"),
  onKeyPress: action("key press")
};

storiesOf("Forms / CheckableImageInput", module)
  .add("unchecked", () => {
    return (
      <CheckableImageInput {...actions}>
        <FontAwesomeIcon icon={faCcVisa} size="2x" />
      </CheckableImageInput>
    );
  })
  .add("checked", () => {
    return (
      <CheckableImageInput checked {...actions}>
        <FontAwesomeIcon icon={faCcVisa} size="2x" />
      </CheckableImageInput>
    );
  })
  .add("disabled", () => {
    return (
      <CheckableImageInput disabled {...actions}>
        <FontAwesomeIcon icon={faCcVisa} size="2x" />
      </CheckableImageInput>
    );
  })
  .add("disabled and checked", () => {
    return (
      <CheckableImageInput disabled checked {...actions}>
        <FontAwesomeIcon icon={faCcVisa} size="2x" />
      </CheckableImageInput>
    );
  })
  .add("readOnly", () => {
    return (
      <CheckableImageInput readOnly {...actions}>
        <FontAwesomeIcon icon={faCcVisa} size="2x" />
      </CheckableImageInput>
    );
  })
  .add("many", () => {
    return (
      <Fragment>
        <CheckableImageInput checked {...actions}>
          <FontAwesomeIcon icon={faCcVisa} size="2x" />
        </CheckableImageInput>
        <CheckableImageInput {...actions}>
          <FontAwesomeIcon icon={faCcMastercard} size="2x" />
        </CheckableImageInput>
        <CheckableImageInput {...actions}>
          <FontAwesomeIcon icon={faCcAmex} size="2x" />
        </CheckableImageInput>
      </Fragment>
    );
  });
