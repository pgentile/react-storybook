import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcVisa, faCcMastercard, faCcAmex } from "@fortawesome/free-brands-svg-icons";

import RadioImageInput from "./RadioImageInput";

storiesOf("Forms / RadioImageInput", module)
  .add("unchecked", () => {
    return (
      <RadioImageInput>
        <FontAwesomeIcon icon={faCcVisa} size="2x" />
      </RadioImageInput>
    );
  })
  .add("checked", () => {
    return (
      <RadioImageInput checked>
        <FontAwesomeIcon icon={faCcVisa} size="2x" />
      </RadioImageInput>
    );
  })
  .add("many", () => {
    return (
      <Fragment>
        <RadioImageInput checked>
          <FontAwesomeIcon icon={faCcVisa} size="2x" />
        </RadioImageInput>
        <RadioImageInput>
          <FontAwesomeIcon icon={faCcMastercard} size="2x" />
        </RadioImageInput>
        <RadioImageInput>
          <FontAwesomeIcon icon={faCcAmex} size="2x" />
        </RadioImageInput>
      </Fragment>
    );
  });
