import InputField from "./InputField";

import NumberInput from "./NumberInput";

export default {
  title: "Forms / InputField",
  component: InputField,
};

export const main = () => <InputField defaultValue="" />;

export const defaultValue = () => <InputField defaultValue="Example" />;

export const avecPlaceholder = () => <InputField defaultValue="" placeholder="Example" />;

export const email = () => <InputField type="email" placeholder="Adresse email" />;

export const password = () => <InputField type="password" value="password" />;

export const numberInput = () => <InputField as={NumberInput} value="123" />;

export const error = () => <InputField defaultValue="" error />;

export const disabled = () => <InputField defaultValue="Example" disabled />;

export const readOnly = () => <InputField defaultValue="Example" readOnly />;
