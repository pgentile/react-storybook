import { ElementType, ReactElement, ReactNode, ButtonHTMLAttributes } from "react";

import "./Button.scss";

import bemModifiers from "../utils/bemModifiers";

export type ButtonType = ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  size?: "small" | "normal" | "large";
  flat?: boolean;
  toggled?: boolean;
  link?: boolean;
};

export default function Button({
  as: Element = "button",
  children,
  className = "",
  size = "normal",
  flat = false,
  toggled,
  link = false,
  ...otherProps
}: ButtonType): ReactElement {
  const realClassName = bemModifiers("button", {
    [`size-${size}`]: true,
    flat,
    toggled: toggled ?? false,
    link,
  });

  return (
    <Element className={`${realClassName} ${className}`} {...otherProps} aria-pressed={toggled}>
      {children}
    </Element>
  );
}
