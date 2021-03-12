import { css } from "@emotion/css/macro";
import { ReactElement, ReactNode } from "react";

const wipClass = css({
  padding: "10px",
  transition: "background-color 0.3s ease-in",
  background: "repeating-linear-gradient(45deg, transparent, transparent 10px, black 10px, black 20px)",
  backgroundColor: "yellow",
  "&:hover": {
    backgroundColor: "orange",
  },
});

const wipContainerClass = css({
  padding: "10px",
  backgroundColor: "white",
});

export type WipProps = {
  children?: ReactNode;
};

export default function Wip({ children }: WipProps): ReactElement {
  return (
    <div className={wipClass}>
      <div className={wipContainerClass}>{children || "Work in progress"}</div>
    </div>
  );
}
