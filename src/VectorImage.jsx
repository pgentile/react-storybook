import { PureComponent } from "react";

import "./VectorImage.scss";

export default class VectorImage extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div className="vector-image">
        <svg version="1.1" viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid meet" className="vector-image__svg">
          <circle cx="0" cy="0" r="49" fill="red" />
        </svg>
      </div>
    );
  }
}
