import React from "react";
import { withKnobs, boolean } from "@storybook/addon-knobs";

import Expandable from "./Expandable";

export default {
  title: "Expandable",
  component: Expandable,
  decorators: [withKnobs],
  parameters: {
    storyshots: false,
  },
};

export const exemple = () => {
  return (
    <Expandable expanded={boolean("expanded", true)}>
      <p>Voici du contenu dépliable.</p>
      <p>Voici du contenu dépliable.</p>
      <p>Voici du contenu dépliable.</p>
      <p>Voici du contenu dépliable.</p>
      <p>Voici du contenu dépliable.</p>
    </Expandable>
  );
};
