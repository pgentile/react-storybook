import React from 'react';

import { storiesOf } from '@storybook/react';

import Card from './Card';


const stories = storiesOf('Card', module)
  .add('Simple carte', () => {
    return (
      <Card>
        <p>Voici une petite carte toute simple.</p>
      </Card>
    );
  })
  .add('Carte avec bordures arrondies', () => {
    return (
      <Card hasRoundedBorder>
        <p>Voici une petite carte toute simple.</p>
      </Card>
    );
  });

['base', 'raised', 'overlay', 'sticky-nav', 'temp-nav', 'pop-out'].forEach(layer => {
  stories.add(`Carte avec niveau ${layer}`, () => {
    return (
      <Card layer={layer}>
        <p>Carte de niveau <b>{layer}</b></p>
      </Card>
    );
  });
});
