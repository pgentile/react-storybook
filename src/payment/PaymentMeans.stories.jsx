import PaymentMeans from "./PaymentMeans";
import { action } from "@storybook/addon-actions";

const means = ["visa", "mastercard", "maestro", "american-express"];

const actions = {
  onMeanChange: action("mean change"),
};

export default {
  title: "Payment / PaymentMeans",
  component: PaymentMeans,
};

export const main = () => {
  return <PaymentMeans means={means} {...actions} />;
};

export const disabledStory = () => {
  return <PaymentMeans means={means} disabled {...actions} />;
};

export const selected = () => {
  return <PaymentMeans selectedMean="mastercard" means={means} {...actions} />;
};
