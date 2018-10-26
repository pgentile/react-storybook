import React from "react";
import { storiesOf } from "@storybook/react";

import InputField from "./InputField";

import NumberInput from "./NumberInput";

storiesOf("Forms / InputField", module)
  .add("main", () => {
    return <InputField defaultValue="" />;
  })
  .add("Avec valeur", () => {
    return <InputField defaultValue="Example" />;
  })
  .add("Avec placeholder", () => {
    return <InputField defaultValue="" placeholder="Example" />;
  })
  .add("Email", () => {
    return <InputField type="email" placeholder="Adresse email" />;
  })
  .add("Mot de passe", () => {
    return <InputField type="password" value="password" />;
  })
  .add("Nombre", () => {
    return <InputField as={NumberInput} defaultValue="123" />;
  })
  .add("Avec erreur", () => {
    return <InputField defaultValue="" error />;
  })
  .add("Désactivé", () => {
    return <InputField defaultValue="Example" disabled />;
  })
  .add("Lecture seule", () => {
    return <InputField defaultValue="Example" readOnly />;
  });
