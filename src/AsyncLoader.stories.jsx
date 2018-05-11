import React from 'react';
import { storiesOf } from '@storybook/react';

import AsyncLoader from './AsyncLoader';


storiesOf('AsyncLoader', module)
  .add('success', () => {
    return (
      <AsyncLoader loader={loader} error={error} />
    );
  })
  .add('error', () => {
    return (
      <AsyncLoader loader={loaderError} error={error} />
    );
  })


async function wait(durationMs) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, durationMs);
  });
}


async function loader() {
  await wait(3000);
  return (
    <p>Mon composant est chargé</p>
  );
}

async function loaderError() {
  await wait(2000);
  throw new Error('Demo error');
}

function error(e) {
  return (
    <p style={{color: 'red'}}>
      Got an error: {`${e}`}
    </p>
  );
}
