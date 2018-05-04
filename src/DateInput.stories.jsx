import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import DateInput from './DateInput';


storiesOf('DateInput', module)
  .addDecorator(withKnobs)
  .add('main', () => {
    return (
      <DateInput value={text('Date', '1990-02-13')} onChange={action('onChange')} />
    );
  });
