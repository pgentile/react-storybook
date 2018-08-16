import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from './Button';


storiesOf('Forms / Button', module)
  .add('main', () => {
    return (
      <Button>Mon bouton</Button>
    );
  })
  .add('disabled', () => {
    return (
      <Button disabled>Mon bouton</Button>
    );
  })
  .add('show disabled', () => {
    return (
      <Button showDisabled>Mon bouton</Button>
    );
  });
