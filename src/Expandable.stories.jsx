import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';

import Expandable from './Expandable';
import Wip from './Wip';


storiesOf('Expandable', module)
  .addDecorator(withKnobs)
  .addDecorator(story => {
    return (
      <Wip>
        {story()}
      </Wip>
    );
  })
  .add('Exemple', () => {
    return (
      <Expandable expanded={boolean('expanded', true)}>
        <Wip>
          <p>Voici du contenu dépliable.</p>
          <p>Voici du contenu dépliable.</p>
          <p>Voici du contenu dépliable.</p>
          <p>Voici du contenu dépliable.</p>
          <p>Voici du contenu dépliable.</p>
        </Wip>
      </Expandable>
    );
  });
