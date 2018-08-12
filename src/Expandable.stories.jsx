import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';

import Expandable from './Expandable';


storiesOf('Expandable', module)
  .addDecorator(withKnobs)
  .add('Exemple', () => {
    return (
      <Expandable expanded={boolean('expanded', true)}>
        <p>Voici du contenu dépliable.</p>
        <p>Voici du contenu dépliable.</p>
        <p>Voici du contenu dépliable.</p>
        <p>Voici du contenu dépliable.</p>
        <p>Voici du contenu dépliable.</p>
      </Expandable>
    );
  });
