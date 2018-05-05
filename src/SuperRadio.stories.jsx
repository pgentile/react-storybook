import React, { createRef } from 'react';
import range from 'lodash-es/range';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee';
import faCloud from '@fortawesome/fontawesome-free-solid/faCloud';

import SuperRadio from './SuperRadio';


storiesOf('SuperRadio', module)
  .addDecorator(withKnobs)
  .add('main', () => {
    return (
      <SuperRadio
        label={text('Label', 'Radio button')}
        description={text('Description', 'This is my radio button')}
        onChange={action('on checked change')}
        icon={faCoffee} />
    );
  })
  .add('reference', () => {
    const ref = createRef();

    return (
      <SuperRadio
        ref={ref}
        label={text('Label 2', 'Radio button 2')}
        description={text('Description 2', 'This is my radio button 2')}
        onChange={action('on checked change 2')}
        icon={faCloud} />
    );
  })
  .add('without icon', () => {
    const ref = createRef();

    return (
      <SuperRadio
        ref={ref}
        label="Radio button 2"
        description="This is my radio button 2"
        onChange="on checked change 2" />
    );
  })
  .add('example', () => {
    return (
      <Example />
    );
  });


class Example extends React.Component {

  state = {
    selectedRadioIndex: null,
  };

  onChangeAction = (index) => () => {
    this.setState({
      selectedRadioIndex: index,
    });
  };

  render() {
    const { selectedRadioIndex } = this.state;

    return range(0, 5).map(index => {
      return (
        <SuperRadio
          key={index}
          label={`Label ${index + 1}`}
          description={`This is my radio button ${index + 1}`}
          onChange={this.onChangeAction(index)}
          checked={index === selectedRadioIndex}
          icon={faCoffee} />
      );
    });
  }

}
