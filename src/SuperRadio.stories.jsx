import React from 'react';
import range from 'lodash-es/range';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee';

import SuperRadio from './SuperRadio';


storiesOf('SuperRadio', module)
  .addDecorator(withKnobs)
  .add('main', () => {
    return (
      <SuperRadio
        label={text('Label', 'Radio button')}
        description={text('Description', 'This is my radio button')}
        onChange={action('on checked change')}
        checked={boolean('Checked', false)}
        icon={faCoffee} />
    );
  })
  .add('without icon', () => {
    return (
      <SuperRadio
        label="Radio button"
        description="This is my radio button" />
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

    return range(3).map(index => {
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
