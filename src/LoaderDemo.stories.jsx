import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';

import createStore from './redux/createStore';
import loader, { loaderMiddleware, selectIsLoading } from './redux/reducers/loader';
import Spinner from './Spinner';
import sleep from './sleep';


storiesOf('LoaderDemo', module)
  .addDecorator(story => {
    const reducers = { loader };
    const store = createStore(reducers, {
      extraMiddlewares: [loaderMiddleware()],
    });

    return (
      <Provider store={store}>
        {story()}
      </Provider>
    );
  })
  .add('main', () => {
    return (
      <LoaderDemoConnected />
    );
  });


class LoaderDemo extends React.PureComponent {

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    loadOne: PropTypes.func.isRequired,
    loadParallel: PropTypes.func.isRequired,
    loadSequential: PropTypes.func.isRequired,
    loadOneNoIndicator: PropTypes.func.isRequired,
  };

  onLoadOne = () => {
    this.props.loadOne();
  };

  onLoadParallel = () => {
    this.props.loadParallel();
  };

  onLoadSequential = () => {
    this.props.loadSequential();
  };

  onLoadOneNoIndicator = () => {
    this.props.loadOneNoIndicator();
  };

  render() {
    const { loading } = this.props;

    return (
      <Fragment>

        <div>
          <button onClick={this.onLoadOne}>Load one</button>
          <button onClick={this.onLoadParallel}>Load parallel</button>
          <button onClick={this.onLoadSequential}>Load sequential</button>
          <button onClick={this.onLoadOneNoIndicator}>Load on, no indicator</button>
        </div>

        {loading && <div>
          <Spinner />
        </div>}

      </Fragment>
    );
  }

}

function loadOne() {
  return dispatch => dispatch(loadSomething());
}

function loadOneNoIndicator() {
  return dispatch => dispatch(loadSomething(true));
}

function loadParallel() {
  return dispatch => {
    for (let i = 0; i < 10; i++) {
      dispatch(loadSomething());
    }
  };
}

function loadSequential() {
  return async dispatch => {
    for (let i = 0; i < 5; i++) {
      await dispatch(loadSomething());
    }
  };
}

function loadSomething(ignoreLoader = false) {
  return {
    type: 'LOAD_SOMETHING',
    payload: sleep(1000),
    meta: {
      loader: {
        ignore: ignoreLoader,
      },
    },
  };
}

const mapDispatchToProps = {
  loadOne,
  loadParallel,
  loadSequential,
  loadOneNoIndicator,
};

const mapStateToProps = state => ({
  loading: selectIsLoading(state),
});

const LoaderDemoConnected = connect(mapStateToProps, mapDispatchToProps)(LoaderDemo);
