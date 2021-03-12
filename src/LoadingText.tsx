import { ReactElement } from "react";
import { range } from "lodash";

import "./LoadingText.scss";

export type LoadingTextProps = {
  count?: number;
};

export default function LoadingText({ count = 5 }: LoadingTextProps): ReactElement {
  const lines = range(count).map((index) => {
    return (
      <p key={index} className="loading-text__line">
        &nbsp;
      </p>
    );
  });

  return <div className="loading-text">{lines}</div>;
}
