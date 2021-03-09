import Expandable, { ExpandableProps } from "./Expandable";

export default {
  title: "Expandable",
  component: Expandable,
  parameters: {
    storyshots: false,
  },
  argTypes: {
    children: {
      control: false,
    },
  },
};

export const exemple = (args: ExpandableProps) => {
  return (
    <Expandable {...args}>
      <p>Voici du contenu dépliable.</p>
      <p>Voici du contenu dépliable.</p>
      <p>Voici du contenu dépliable.</p>
      <p>Voici du contenu dépliable.</p>
      <p>Voici du contenu dépliable.</p>
    </Expandable>
  );
};

exemple.args = {
  expanded: true,
};
