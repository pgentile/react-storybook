import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import Expandable from './Expandable';
import sleep from './sleep';


beforeAll(() => {
  configure({
    adapter: new Adapter(),
  });
});

describe('Montage des Expandable', () => {

  function validateStructure(wrapper) {
    const root = wrapper.find('.expandable');
    expect(root).toHaveLength(1);

    const expWindow = root.find('.expandable__window');
    expect(expWindow).toHaveLength(1);

    const content = expWindow.find('.expandable__content');
    expect(content).toHaveLength(1);

    const wrappedContent = content.find('.expandable__content');
    expect(wrappedContent).toHaveLength(1);
  }

  test('Expandable replié', () => {
    const wrapper = mount(
      (
        <Expandable>
          <p className="expandable-content-test">This is the content to expand.</p>
        </Expandable>
      ),
    );

    validateStructure(wrapper);
    expect(wrapper.find('.expandable__window').getDOMNode().style).toHaveProperty('height', '0px');

    wrapper.unmount();
  });

  test('Expandable déplié', () => {
    const wrapper = mount(
      (
        <Expandable expanded={true}>
          <p className="expandable-content-test">This is the content to expand.</p>
        </Expandable>
      ),
    );

    validateStructure(wrapper);
    expect(wrapper.find('.expandable__window').getDOMNode().style).toHaveProperty('height', 'auto');

    wrapper.unmount();
  });

});

describe('Pliage / dépliagle des Expandable', () => {

  test('Dépliage', async () => {
    const requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame')

    const wrapper = mount(
      (
        <Expandable>
          <p className="expandable-content-test">This is the content to expand.</p>
        </Expandable>
      ),
    );

    expect(wrapper.find('.expandable__window').getDOMNode().style).toHaveProperty('height', '0px');

    wrapper.setProps({
      expanded: true,
    });

    // Attendre la fin de l'animation
    await waitUntil(150 * 2, () => {
      expect(wrapper.find('.expandable__window').getDOMNode().style).toHaveProperty('height', 'auto');
    });

    expect(requestAnimationFrameSpy).toHaveBeenCalled();

    wrapper.unmount();

    requestAnimationFrameSpy.mockRestore();
  });

  test('Dépliage, puis repliage', async () => {
    const requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame')

    const wrapper = mount(
      (
        <Expandable>
          <p className="expandable-content-test">This is the content to expand.</p>
        </Expandable>
      ),
    );

    expect(wrapper.find('.expandable__window').getDOMNode().style).toHaveProperty('height', '0px');

    // Déplier
    wrapper.setProps({
      expanded: true,
    });

    // Attendre la fin de l'animation
    await waitUntil(150 * 2, () => {
      expect(wrapper.find('.expandable__window').getDOMNode().style).toHaveProperty('height', 'auto');
    });

    // Replier
    wrapper.setProps({
      expanded: false,
    });

    // Attendre la fin de l'animation
    await waitUntil(150 * 2, () => {
      expect(wrapper.find('.expandable__window').getDOMNode().style).toHaveProperty('height', '0px');
    });

    expect(requestAnimationFrameSpy).toHaveBeenCalled();

    wrapper.unmount();

    requestAnimationFrameSpy.mockRestore();
  });

})


async function waitUntil(maxDuration, callback) {
  const endTimestamp = Date.now() + maxDuration;

  let exception = new Error('Failed to complete');
  do {
    try {
      callback();

      // Success ! Break the method
      return;
    } catch (e) {
      exception = e;
    }

    await sleep(50);
  } while (Date.now() <= endTimestamp);

  console.error(`Failed to complete in success for ${maxDuration}ms`);
  throw exception;
}
