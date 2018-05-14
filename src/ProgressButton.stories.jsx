import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';

import ProgressButton from './ProgressButton';


storiesOf('ProgressButton', module)
  .addDecorator(withKnobs)
  .add('main', () => {
    return (
      <ProgressButton
        disabled={boolean('Disabled ?', false)}
        loading={boolean('Loading ?', false)}
        finished={boolean('Finished ?', false)}>
        Payer
      </ProgressButton>
    );
  });
