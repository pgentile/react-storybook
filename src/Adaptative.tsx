import { ReactElement } from "react";
import "./Adaptative.scss";

export default function Adaptative(): ReactElement {
  return (
    <div className="adaptative">
      <div className="adaptative__item">Proposal 1</div>
      <div className="adaptative__item">Proposal 2</div>
      <div className="adaptative__item">Proposal 3</div>
      <div className="adaptative__item">Proposal 4</div>
    </div>
  );
}
