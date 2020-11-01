import StickyElement from "./StickyElement";

export default {
  title: "CSS / StickyElement",
  component: StickyElement,
};

export const main = (args) => {
  return <StickyElement {...args} />;
};

main.args = {
  top: 0,
};
