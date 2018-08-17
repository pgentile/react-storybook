import React from 'react';
import { storiesOf } from '@storybook/react';

import ProgressButton from './ProgressButton';


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

  onClick = () => {
    this.setState({
      loading: true,
    });

    setTimeout(() => {
      this.setState({
        finished: true,
      });

      setTimeout(() => {
        this.setState({
          loading: false,
          finished: false,
        });
      }, 1000);
    }, 3000);
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
