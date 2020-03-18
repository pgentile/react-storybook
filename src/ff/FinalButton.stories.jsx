import React from "react";
import { Form } from "react-final-form";

import FinalButton from "./FinalButton";
import sleep from "../utils/sleep";

export default {
  title: "Final Forms components | FinalButton",
  component: FinalButton
};

export const main = () => {
  const onSubmit = async () => {
    await sleep(3000);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FinalButton type="submit">Envoyer</FinalButton>
          <FinalButton type="reset">Reset</FinalButton>
        </form>
      )}
    ></Form>
  );
};
