import React from "react";

import "./Adaptative.scss";

// See http://tobiasahlin.com/spinkit/
export default class Adaptative extends React.PureComponent {
  render() {
    return (
      <div className="adaptative">
        <div className="adaptative__item">Proposal 1</div>
        <div className="adaptative__item">Proposal 2</div>
        <div className="adaptative__item">Proposal 3</div>
        <div className="adaptative__item">Proposal 4</div>
      </div>
    );
  }
}
