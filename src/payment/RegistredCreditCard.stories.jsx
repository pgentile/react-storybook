import RegistredCreditCard from "./RegistredCreditCard";

export default {
  title: "Payment / RegistredCreditCard",
  component: RegistredCreditCard,
  argTypes: {
    onShowCvv: {
      action: "show CVV",
    },
    onHideCvv: {
      action: "hide CVV",
    },
    onUseCard: {
      action: "use card",
    },
    cardBrand: {
      control: "text",
      defaultValue: "visa",
    },
    totalPriceValue: {
      type: "number",
      defaultValue: 10,
    },
    currency: {
      control: "text",
      defaultValue: "EUR",
    },
    totalPrice: {
      control: null,
    },
    card: {
      control: null,
    },
  },
};

export function Main({ totalPriceValue, currency, ...args }) {
  const { cardBrand } = args;
  const card = {
    id: "1",
    brand: cardBrand,
    maskedNumber: "#### #### #### 111#",
    expirationDate: "2031-01",
  };
  return <RegistredCreditCard totalPrice={{ value: totalPriceValue, currency }} card={card} {...args} />;
}
