import Expandable from "./Expandable";

export default {
  title: "Expandable",
  component: Expandable,
  parameters: {
    storyshots: false,
  },
  argTypes: {
    children: {
      control: { disable: true },
    },
  },
};

export const exemple = (args) => {
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
