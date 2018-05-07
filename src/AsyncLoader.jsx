import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Spinner from './Spinner';


export default class AsyncLoader extends React.PureComponent {

  static propTypes = {
    loader: PropTypes.func.isRequired,
  };

  state = {
    loading: true,
    component: null,
  };

  async componentDidMount() {
    const { loader } = this.props;
    try {
      const component = await loader();
      this.setState({
        loading: false,
        component,
      });
    } catch (e) {
      console.error('Failed to load some component', e);

      this.setState({
        loading: false,
      });
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
