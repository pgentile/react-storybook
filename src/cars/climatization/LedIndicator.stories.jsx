import LedIndicator from "./LedIndicator";

export default {
  title: "Cars / Core / LedIndicator",
  component: LedIndicator,
};

export const main = () => {
  return <LedIndicator color="red" />;
};

export const enabled = () => {
  return <LedIndicator color="blue" enabled />;
};

export const green = () => {
  return <LedIndicator color="green" enabled />;
};

export const normal = () => {
  return <LedIndicator color="red" enabled size="normal" />;
};

export const large = () => {
  return <LedIndicator color="blue" enabled size="large" />;
};

export const blink = () => {
  return <LedIndicator color="red" enabled blink />;
};
