import React from 'react';

import { storiesOf } from '@storybook/react';

import encryptPayload from './encryptPayload';


storiesOf('Encryption', module)
  .add('test', () => {
    encryptPayload('This is my data');
    return (
      <div style={{color: 'red', fontSize: '3em', fontWeight: 'bold'}}>
        Please look at your console
      </div>
    );
  });
