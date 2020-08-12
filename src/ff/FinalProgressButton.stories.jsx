import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";

import FinalProgressButton from "./FinalProgressButton";
import FinalButton from "./FinalButton";
import sleep from "../utils/sleep";

export default {
  title: "Final Forms components / FinalProgressButton",
  component: FinalProgressButton,
};

export const main = () => {
  const onSubmit = async () => {
    await sleep(3000);
  };

  return <Form onSubmit={onSubmit} component={Demo}></Form>;
};

function Demo({ handleSubmit, form }) {
  const onReset = useCallback(() => {
    form.reset();
  }, [form]);

  return (
    <form onSubmit={handleSubmit} onReset={onReset}>
      <FinalProgressButton type="submit">Envoyer</FinalProgressButton>
      <FinalButton type="reset">Reset</FinalButton>
    </form>
  );
}

Demo.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};
