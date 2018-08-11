import React from 'react';

import { storiesOf } from '@storybook/react';

import Card from './Card';


storiesOf('Card', module)
  .add('Exemple', () => {
    return (
      <Card>
        <p>Voici une petite carte toute simple.</p>
      </Card>
    );
  });
