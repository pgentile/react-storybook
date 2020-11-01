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
      type: "number",
      defaultValue: 10,
    },
    currency: {
      control: {
        type: "text",
      },
      defaultValue: "EUR",
    },
    totalPrice: {
      control: {
        type: null,
      },
    },
  },
};

// eslint-disable-next-line react/prop-types
export function Main({ totalPriceValue, currency, ...args }) {
  return <RegistredCardCvvForm totalPrice={{ value: totalPriceValue, currency }} {...args} />;
}
