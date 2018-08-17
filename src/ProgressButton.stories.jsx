import React from 'react';
import { storiesOf } from '@storybook/react';

import ProgressButton from './ProgressButton';
import sleep from './sleep';


storiesOf('Forms / ProgressButton', module)
  .add('main', () => {
    return (
      <ProgressButtonDemo />
    );
  })
  .add('loading', () => {
    return (
      <ProgressButton loading>Payer</ProgressButton>
    );
  })
  .add('finished', () => {
    return (
      <ProgressButton finished>Payer</ProgressButton>
    );
  })
  .add('disabled', () => {
    return (
      <ProgressButton disabled>Payer</ProgressButton>
    );
  });


class ProgressButtonDemo extends React.PureComponent {

  state = {
    loading: false,
    finished: false,
  };

  onClick = async () => {
    this.setState({
      loading: true,
    });

    await sleep(3000);

    this.setState({
      finished: true,
    });

    await sleep(1000);

    this.setState({
      loading: false,
      finished: false,
    });
  };

  render() {
    const { loading, finished } = this.state;

    return (
      <ProgressButton loading={loading} finished={finished} onClick={this.onClick}>
        Payer
      </ProgressButton>
    );
  }

}
