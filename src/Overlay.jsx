import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import './Overlay.scss';


export default class Overlay extends React.Component {

  static propTypes = {
    children: PropTypes.node,
  };

  body = null;
  element = null;

  componentDidMount() {
    this.element = document.createElement('div');
    this.element.className = 'overlay-container';

    this.body = document.getElementsByTagName('body')[0];
    this.body.appendChild(this.element);
  }

  componentWillUnmount() {
    this.body.removeChild(this.element);
  }

  render() {
    if (this.element) {
      const overlay = this.renderOverlay();
      return createPortal(
        overlay,
        this.element,
      );
    }

    return null;
  }

  renderOverlay() {
    const { children } = this.props;

    return (
      <div className="overlay">
        {children}
      </div>
    );
  }

}
