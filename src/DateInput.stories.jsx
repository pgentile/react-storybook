import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import DateInput from './DateInput';


storiesOf('DateInput', module)
  .addDecorator(withKnobs)
  .add('main', () => {
    return (
      <DateInput value={text('Date', '1990-02-13')} onChange={action('onChange')} />
    );
  })
  .add('empty', () => {
    return (
      <DateInput onChange={action('onChange')} />
    );
  })
  .add('dynamic', () => {
    return (
      <DynamicForm />
    );
  });


class DynamicForm extends React.PureComponent {

  state = {
    value: '',
  };

  onChange = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    const { value } = this.state;
    return (
      <DateInput value={value} onChange={this.onChange} />
    );
  }

}
