import React from 'react';
import { storiesOf } from '@storybook/react';

import AsyncLoader from './AsyncLoader';


storiesOf('AsyncLoader', module)
  .add('main', () => {
    return (
      <AsyncLoader loader={loader} />
    );
  });


async function loader() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const component = (
        <p>Mon composant est chargé</p>
      );
      resolve(component);
    }, 3000);
  });
}
