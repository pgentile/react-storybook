import React, { createRef } from 'react';
import PropTypes from 'prop-types';

import './Expandable.scss';


export default class Expandable extends React.PureComponent {

  static propTypes = {
    children: PropTypes.node.isRequired,
    expanded: PropTypes.bool.isRequired,
    duration: PropTypes.number.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    expanded: true,
    duration: 200,
    className: '',
  };

  windowRef = createRef();

  contentRef = createRef();

  unmounted = false;

  componentDidMount() {
    const { expanded } = this.props;
    expanded ? this.showNow() : this.hideNow();
  }

  componentDidUpdate(prevProps) {
    const { expanded, duration } = this.props;
    if (prevProps.expanded !== expanded) {
      expanded ? this.show(duration) : this.hide(duration);
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  async show(duration) {
    const contentHeight = this.contentRef.current.clientHeight;

    await animate(duration, progress => {
      if (this.unmounted) {
        return;
      }

      const newHeight = contentHeight * progress;
      this.windowRef.current.style.height = `${newHeight}px`;
    });

    this.windowRef.current.style.height = 'auto';
  }

  async hide(duration) {
    const contentHeight = this.contentRef.current.clientHeight;

    await animate(duration, progress => {
      if (this.unmounted) {
        return;
      }

      const newHeight = contentHeight * (1 - progress);
      this.windowRef.current.style.height = `${newHeight}px`;
    });

    this.windowRef.current.style.height = 0;
  }

  showNow() {
    this.windowRef.current.style.height = 'auto';
  }

  hideNow() {
    this.windowRef.current.style.height = 0;
  }

  render() {
    // Linter: ne pas passer expanded en
    // eslint-disable-next-line no-unused-vars
    const { children, expanded, className, ...otherProps } = this.props;

    return (
      <div className={`expandable ${className}`} {...otherProps}>
        <div className="expandable__window" ref={this.windowRef}>
          <div className="expandable__content" ref={this.contentRef}>
            {children}
          </div>
        </div>
      </div>
    );
  }

}


async function animate(duration, callback) {
  return new Promise(resolve => {
    let startTime = null;

    const step = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const maxProgress = 1.0;
      const progress = Math.min((timestamp - startTime) / duration, maxProgress);
      callback(progress);

      if (progress < maxProgress) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(step);
  });
}

