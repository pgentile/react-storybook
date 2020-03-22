import React from "react";
import PropTypes from "prop-types";
import { Form, useField } from "react-final-form";

import FinalFieldContainer from "./FinalFieldContainer";
import sleep from "../utils/sleep";

export default {
  title: "Final Forms components | FinalFieldContainer",
  component: FinalFieldContainer,
};

export const main = () => {
  const onSubmit = async ({ name }) => {
    await sleep(500);
    if (!name || name.length <= 3) {
      return {
        name: "Moins de trois caractères",
      };
    }
  };

  return <Form onSubmit={onSubmit} component={Demo}></Form>;
};

function Demo({ handleSubmit }) {
  useField("name", {
    validate: (value) => {
      if (!value || value.length <= 2) {
        return "Moins de deux caractères";
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <FinalFieldContainer name="name" label="Nom">
        {(props) => <input {...props} autoComplete="off" autoCorrect="off" />}
      </FinalFieldContainer>
    </form>
  );
}

Demo.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
