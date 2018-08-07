import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';

import Overlay from './Overlay';


storiesOf('Overlay', module)
  .addDecorator(withKnobs)
  .add('main', () => {
    return (
      <Overlay />
    );
  });
