import Card from "./Card";

export default {
  title: "Card",
  component: Card,
  argTypes: {
    as: {
      control: false,
    },
    children: {
      control: false,
    },
    layer: {
      control: {
        type: "inline-radio",
      },
    },
  },
};

export function Main(args) {
  const { layer, hasBorder } = args;
  return (
    <Card {...args}>
      <p>
        Carte de niveau <b>{layer}</b> {hasBorder && "sans borbure"}
      </p>
    </Card>
  );
}
