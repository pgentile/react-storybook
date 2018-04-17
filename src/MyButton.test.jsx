import React from 'react';
import renderer from 'react-test-renderer';

import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee';

import MyButton from './MyButton';


test('Button with label', () => {
  const component = renderer.create(
    (
      <MyButton label="My Label" />
    ),
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


test('Button with icon', () => {
  const component = renderer.create(
    (
      <MyButton label="Un café ?" icon={faCoffee} />
    ),
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

