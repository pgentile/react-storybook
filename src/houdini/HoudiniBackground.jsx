import React, { createRef } from "react";

import "./HoudiniBackground.scss";

export default class HoudiniBackground extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  ref = createRef();

  componentDidMount() {
    const start = performance.now();
    const element = this.ref.current;

    requestAnimationFrame(function raf(now) {
      const count = Math.floor(now - start);
      const angle = Math.round(count * Math.PI) / 1000.0;

      element.style.cssText = `--angle: ${angle}`;

      requestAnimationFrame(raf);
    });
  }

  render() {
    return (
      <div className="houdini-background" ref={this.ref}>
        <p>Houdini Background</p>
      </div>
    );
  }
}

if (process.env.NODE_ENV !== "test") {
  let loaded = false;
  if (!loaded) {
    if (CSS.paintWorklet) {
      CSS.paintWorklet.addModule("/houdini/background.js");
    }
    loaded = true;
  }
}
