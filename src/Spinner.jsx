import { PureComponent } from "react";

import "./Spinner.scss";

// See http://tobiasahlin.com/spinkit/
export default class Spinner extends PureComponent {
  render() {
    return (
      <div className="spinner">
        <div className="spinner__bounce" />
        <div className="spinner__bounce" />
        <div className="spinner__bounce" />
      </div>
    );
  }
}
