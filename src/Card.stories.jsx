import React from "react";

import { storiesOf } from "@storybook/react";

import Card from "./Card";

const content = <p>Voici une jolie petite carte.</p>;

const layers = ["base", "flat", "raised", "overlay", "sticky-nav", "temp-nav", "pop-out"];

const stories = storiesOf("Card", module);

stories.add("Carte simple", () => {
  return <Card>{content}</Card>;
});

layers.forEach((layer) => {
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

layers.forEach((layer) => {
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
