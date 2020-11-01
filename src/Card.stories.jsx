import Card from "./Card";

export default {
  title: "Card",
  component: Card,
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
