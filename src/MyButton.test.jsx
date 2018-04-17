import React from 'react';
import renderer from 'react-test-renderer';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee';

import MyButton from './MyButton';


beforeAll(() => {
  configure({
    adapter: new Adapter(),
  });
});

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
      <MyButton
        label="Un café ?"
        icon={faCoffee} />
    ),
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button with onClick callback', () => {
  const onClick = jest.fn();

  const component = mount(
    <MyButton label="Un café ?" onClick={onClick} />
  );

  component.find('button').simulate('click');

  expect(onClick).toBeCalled();
});
