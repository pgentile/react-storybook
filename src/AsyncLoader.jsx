import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Spinner from "./Spinner";

export default class AsyncLoader extends React.Component {
  static propTypes = {
    loader: PropTypes.func.isRequired,
    error: PropTypes.func
  };

  state = {
    loading: true,
    component: null,
    generation: 0
  };

  unmounted = false;

  onLoaded(component, expectedGeneration) {
    if (!this.unmounted) {
      this.setState(prevState => {
        if (prevState.generation === expectedGeneration) {
          this.setState({
            loading: false,
            component
          });
        }
      });
    }
  }

  async load(generation) {
    const { loader, error } = this.props;

    const newGeneration = generation + 1;
    this.setState({
      generation: newGeneration
    });

    let component = null;
    try {
      component = await loader();
    } catch (e) {
      console.error("Failed to load some component", e);
      component = error(e);
    }

    this.onLoaded(component, newGeneration);
  }

  componentDidMount() {
    const { generation } = this.state;
    this.load(generation);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { generation } = this.state;
      this.load(generation);
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
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
