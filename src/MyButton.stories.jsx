import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import MyButton from './MyButton';

storiesOf('MyButton', module)
  .addDecorator(withKnobs)
  .add('with simple label', () => {
    return (
      <MyButton
        label={text('Label', "C'est mon label de bouton")}
        onClick={action('On button click')} />
    );
  });
