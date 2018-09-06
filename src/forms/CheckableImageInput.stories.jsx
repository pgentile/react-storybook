import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcVisa, faCcMastercard, faCcAmex } from "@fortawesome/free-brands-svg-icons";

import CheckableImageInput from "./CheckableImageInput";

storiesOf("Forms / CheckableImageInput", module)
  .add("unchecked", () => {
    return (
      <CheckableImageInput>
        <FontAwesomeIcon icon={faCcVisa} size="2x" />
      </CheckableImageInput>
    );
  })
  .add("checked", () => {
    return (
      <CheckableImageInput checked>
        <FontAwesomeIcon icon={faCcVisa} size="2x" />
      </CheckableImageInput>
    );
  })
  .add("disabled", () => {
    return (
      <CheckableImageInput disabled>
        <FontAwesomeIcon icon={faCcVisa} size="2x" />
      </CheckableImageInput>
    );
  })
  .add("disabled and checked", () => {
    return (
      <CheckableImageInput disabled checked>
        <FontAwesomeIcon icon={faCcVisa} size="2x" />
      </CheckableImageInput>
    );
  })
  .add("many", () => {
    return (
      <Fragment>
        <CheckableImageInput checked>
          <FontAwesomeIcon icon={faCcVisa} size="2x" />
        </CheckableImageInput>
        <CheckableImageInput>
          <FontAwesomeIcon icon={faCcMastercard} size="2x" />
        </CheckableImageInput>
        <CheckableImageInput>
          <FontAwesomeIcon icon={faCcAmex} size="2x" />
        </CheckableImageInput>
      </Fragment>
    );
  });
