import React, { createRef } from 'react';
import PropTypes from 'prop-types';

import animate from './animate';

import './Expandable.scss';


export default class Expandable extends React.PureComponent {

  static propTypes = {
    children: PropTypes.node,
    expanded: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    expanded: false,
  };

  duration = 150;

  windowRef = createRef();

  contentRef = createRef();

  unmounted = false;

  componentDidMount() {
    const { expanded } = this.props;
    expanded ? this.showNow() : this.hideNow();
  }

  componentDidUpdate(prevProps) {
    const { expanded } = this.props;
    if (prevProps.expanded !== expanded) {
      expanded ? this.show() : this.hide();
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  async animate(callback) {
    return await animate(this.duration, this.stillMounted(callback));
  }

  stillMounted(callback) {
    return (...args) => {
      if (this.unmounted) {
        return;
      }

      callback(...args);
    };
  }

  async show() {
    const contentHeight = this.contentRef.current.offsetHeight;

    await this.animate(progress => {
      const newHeight = contentHeight * progress;
      this.windowRef.current.style.height = `${newHeight}px`;
    });

    this.stillMounted(() => {
      this.windowRef.current.style.height = 'auto';
    });
  }

  async hide() {
    const contentHeight = this.windowRef.current.offsetHeight;

    await this.animate(progress => {
      const newHeight = contentHeight * (1 - progress);
      this.windowRef.current.style.height = `${newHeight}px`;
    });

    this.stillMounted(() => {
      this.windowRef.current.style.height = 0;
    });
  }

  showNow() {
    this.windowRef.current.style.height = 'auto';
  }

  hideNow() {
    this.windowRef.current.style.height = 0;
  }

  render() {
    const { children } = this.props;

    return (
      <div className="expandable">
        <div className="expandable__window" ref={this.windowRef}>
          <div className="expandable__content" ref={this.contentRef}>
            {children}
          </div>
        </div>
      </div>
    );
  }

}

