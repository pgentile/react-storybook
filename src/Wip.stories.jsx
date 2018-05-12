import React from 'react';

import { storiesOf } from '@storybook/react';

import Wip from './Wip';


storiesOf('Wip', module)
  .add('main', () => {
    return (
      <Wip>
        Work in progress
      </Wip>
    );
  });
