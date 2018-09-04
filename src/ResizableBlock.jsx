import React, { createRef } from "react";
import PropTypes from "prop-types";
import ResizeObserver from "resize-observer-polyfill";

export default class ResizableBlock extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    defaultBreakpoint: PropTypes.string.isRequired,
    breakpoints: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        minWidth: PropTypes.number.isRequired
      })
    ).isRequired
  };

  static defaultProps = {
    breakpoints: []
  };

  blockRef = createRef();

  constructor(props) {
    super(props);

    this.state = {
      breakpoint: props.defaultBreakpoint
    };
  }

  computeCurrentBreakpoint(width) {
    const { defaultBreakpoint, breakpoints } = this.props;

    let currentBreakpoint = defaultBreakpoint;
    breakpoints.forEach(breakpoint => {
      const { name, minWidth } = breakpoint;
      if (width >= minWidth) {
        currentBreakpoint = name;
      }
    });

    return currentBreakpoint;
  }

  componentDidMount() {
    const { current } = this.blockRef;
    if (current) {
      this.observer = new ResizeObserver(entries => {
        entries.forEach(entry => {
          const { width } = entry.contentRect;
          const breakpoint = this.computeCurrentBreakpoint(width);

          this.setState(state => {
            if (state.breakpoint !== breakpoint) {
              return { breakpoint };
            }
            return null;
          });
        });
      });
      this.observer.observe(current);
    }
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  render() {
    const { children } = this.props;
    const { breakpoint } = this.state;
    return <div ref={this.blockRef}>{children(breakpoint)}</div>;
  }
}
