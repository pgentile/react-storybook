import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee';

import SuperRadio from './SuperRadio';


storiesOf('SuperRadio', module)
  .addDecorator(withKnobs)
  .add('main', () => {
    return (
      <SuperRadio
        label={text('Label', 'Radio button')}
        description={text('Description', 'This is my radio button')}
        onChange={action('on checked change')}
        icon={faCoffee} />
    );
  });
