import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import makeCancelable from 'makecancelable';

import Spinner from './Spinner';


export default class AsyncLoader extends React.PureComponent {

  static propTypes = {
    loader: PropTypes.func.isRequired,
  };

  state = {
    loading: true,
    component: null,
  };

  cancel = null;

  componentDidMount() {
    const { loader } = this.props;

    this.cancel = makeCancelable(
      loader(),
      (component) => {
        this.setState({
          loading: false,
          component,
        });
      },
      (e) => {
        this.setState({
          loading: false,
        });
        console.error('Failed to load some component', e);
      },
    );
  }

  componentWillUnmount() {
    if (this.cancel) {
      this.cancel();
    }
  }

  render() {
    const { loading, component } = this.state;

    return (
      <Fragment>
        {loading && <Spinner />}
        {component}
      </Fragment>
    );
  }

}
