import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import DebouncedInput from './DebouncedInput';

storiesOf('DebouncedInput', module)
  .addDecorator(withKnobs)
  .add('with a debounced value', () => {
    return (
      <DebouncedInput
        debounceDelay={number('Debounce delay', 1000)}
        onChange={action('On value change')} />
    );
  });
