import RegistredCardCvvForm from "./RegistredCardCvvForm";

export default {
  title: "Payment / RegistredCardCvvForm",
  component: RegistredCardCvvForm,
  argTypes: {
    onUseCard: {
      action: "use card",
    },
    onCancel: {
      action: "hide CVV",
    },
    brand: {
      defaultValue: "visa",
    },
    totalPriceValue: {
      control: "number",
      defaultValue: 10,
    },
    currency: {
      control: "text",
      defaultValue: "EUR",
    },
    totalPrice: {
      control: null,
    },
  },
};

export function Main({ totalPriceValue, currency, ...args }) {
  return <RegistredCardCvvForm totalPrice={{ value: totalPriceValue, currency }} {...args} />;
}
