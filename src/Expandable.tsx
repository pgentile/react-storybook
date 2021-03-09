import { PureComponent, createRef, ReactNode, ReactElement } from "react";
import PropTypes from "prop-types";

import animate from "./utils/animate";

import "./Expandable.scss";

export default class Expandable extends PureComponent<ExpandableProps> {
  static propTypes = {
    children: PropTypes.node,
    expanded: PropTypes.bool,
  };

  static defaultProps = {
    expanded: false,
  };

  duration = 150;

  windowRef = createRef<HTMLDivElement>();

  contentRef = createRef<HTMLDivElement>();

  unmounted = false;

  componentDidMount(): void {
    const { expanded } = this.props;
    expanded ? this.showNow() : this.hideNow();
  }

  componentDidUpdate(prevProps: ExpandableProps): void {
    const { expanded } = this.props;
    if (prevProps.expanded !== expanded) {
      expanded ? this.show() : this.hide();
    }
  }

  componentWillUnmount(): void {
    this.unmounted = true;
  }

  async animate(callback: (progress: number) => void): Promise<void> {
    return await animate(this.duration, (progress) => {
      this.stillMounted(() => callback(progress));
    });
  }

  stillMounted(callback: () => void): void {
    if (this.unmounted) {
      return;
    }

    callback();
  }

  async show(): Promise<void> {
    const contentElement = this.contentRef.current;
    const windowElement = this.windowRef.current;

    if (!contentElement || !windowElement) {
      return;
    }

    const contentHeight = contentElement.offsetHeight;

    await this.animate((progress) => {
      const newHeight = contentHeight * progress;
      windowElement.style.height = `${newHeight}px`;
    });

    this.stillMounted(() => {
      windowElement.style.height = "auto";
    });
  }

  async hide(): Promise<void> {
    const contentElement = this.contentRef.current;
    const windowElement = this.windowRef.current;

    if (!contentElement || !windowElement) {
      return;
    }

    const contentHeight = contentElement.offsetHeight;

    await this.animate((progress) => {
      const newHeight = contentHeight * (1 - progress);
      windowElement.style.height = `${newHeight}px`;
    });

    this.stillMounted(() => {
      windowElement.style.height = "0";
    });
  }

  showNow(): void {
    const windowElement = this.windowRef.current;

    if (!windowElement) {
      return;
    }

    windowElement.style.height = "auto";
  }

  hideNow(): void {
    const windowElement = this.windowRef.current;

    if (!windowElement) {
      return;
    }

    windowElement.style.height = "0";
  }

  render(): ReactElement {
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

export type ExpandableProps = {
  children: ReactNode;
  expanded: boolean;
};
