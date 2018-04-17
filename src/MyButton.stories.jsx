import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee';

import MyButton from './MyButton';


storiesOf('MyButton', module)
  .addDecorator(withKnobs)
  .add('with simple label', () => {
    return (
      <MyButton
        label={text('Label', "C'est mon label de bouton")}
        onClick={action('On button click')} />
    );
  })
  .add('with icon', () => {
    return (
      <MyButton
        label={text('Label', 'Un café ?')}
        icon={faCoffee}
        onClick={action('On button click')} />
    );
  });
