import React from "react";
import { storiesOf } from "@storybook/react";

import Card, { LAYERS } from "./Card";

const content = <p>Voici une jolie petite carte.</p>;

const stories = storiesOf("Card", module);

stories.add("Carte simple", () => {
  return <Card>{content}</Card>;
});

LAYERS.forEach((layer) => {
  stories.add(`Carte de niveau ${layer}`, () => {
    return (
      <Card layer={layer}>
        <p>
          Carte de niveau <b>{layer}</b>
        </p>
      </Card>
    );
  });
});

LAYERS.forEach((layer) => {
  stories.add(`Carte de niveau ${layer} sans bordure`, () => {
    return (
      <Card layer={layer} hasBorder={false}>
        <p>
          Carte de niveau <b>{layer}</b> sans borbure
        </p>
      </Card>
    );
  });
});
