import { ReactElement } from "react";
import Button, { ButtonType } from "./Button";
import bemModifiers from "../utils/bemModifiers";

import "./ProgressButton.scss";

export type ProgressButtonProps = ButtonType & {
  loading?: boolean;
  finished?: boolean;
  disabled?: boolean;
};

export default function ProgressButton({
  className = "",
  loading = false,
  finished = false,
  disabled = false,
  children,
  ...otherProps
}: ProgressButtonProps): ReactElement {
  const progressBarClassName = bemModifiers("progress-button__progress-bar", {
    loading,
    finished,
  });

  return (
    <Button className={`progress-button ${className}`} disabled={loading || finished || disabled} {...otherProps}>
      <div className="progress-button__content">{children}</div>
      <div className={progressBarClassName} />
    </Button>
  );
}
