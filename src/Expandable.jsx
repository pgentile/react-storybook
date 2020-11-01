import { PureComponent, createRef } from "react";
import PropTypes from "prop-types";

import animate from "./utils/animate";

import "./Expandable.scss";

export default class Expandable extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    expanded: PropTypes.bool,
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
    return await animate(this.duration, (progress) => {
      this.stillMounted(() => callback(progress));
    });
  }

  stillMounted(callback) {
    if (this.unmounted) {
      return;
    }

    callback();
  }

  async show() {
    const contentHeight = this.contentRef.current.offsetHeight;

    await this.animate((progress) => {
      const newHeight = contentHeight * progress;
      this.windowRef.current.style.height = `${newHeight}px`;
    });

    this.stillMounted(() => {
      this.windowRef.current.style.height = "auto";
    });
  }

  async hide() {
    const contentHeight = this.windowRef.current.offsetHeight;

    await this.animate((progress) => {
      const newHeight = contentHeight * (1 - progress);
      this.windowRef.current.style.height = `${newHeight}px`;
    });

    this.stillMounted(() => {
      this.windowRef.current.style.height = 0;
    });
  }

  showNow() {
    if (!this.windowRef.current) {
      return;
    }
    this.windowRef.current.style.height = "auto";
  }

  hideNow() {
    if (!this.windowRef.current) {
      return;
    }
    this.windowRef.current.style.height = 0;
  }

  render() {
    const { children, expanded } = this.props;

    return (
      <div className="expandable" aria-hidden={!expanded}>
        <div className="expandable__window" ref={this.windowRef}>
          <div className="expandable__content" ref={this.contentRef}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
