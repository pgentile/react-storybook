import { Form, Field } from "react-final-form";
import { action } from "@storybook/addon-actions";

import FinalButton from "./FinalButton";
import sleep from "../utils/sleep";

export default {
  title: "Final Forms components / FinalButton",
  component: FinalButton,
};

export const main = () => {
  const onSubmit = async (...args) => {
    await sleep(3000);
    action("submit")(args);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="field1" defaultValue="value1" component="input" type="hidden" />
          <Field name="field2" defaultValue="value2" component="input" type="hidden" />
          <FinalButton type="submit">Envoyer</FinalButton>
          <FinalButton type="reset">Reset</FinalButton>
        </form>
      )}
    ></Form>
  );
};
