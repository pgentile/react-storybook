import PropTypes from "prop-types";
import { css, cx } from "emotion/macro";
import { rgba } from "polished";

export const LAYERS = ["base", "flat", "raised", "overlay", "sticky-nav", "temp-nav", "pop-out"];

const backgroundColor = "white";
const borderWidth = "1px";
const borderColor = "#bbb";
const layerShadowColor = rgba("#000", 0.2);

const shadowSizes = {
  raised: "0 1px 2px 0",
  overlay: "0 4px 8px 0",
  "sticky-nav": "0 6px 12px 0",
  "temp-nav": "0 8px 16px 0",
  "pop-out": "0 12px 24px 0",
};

export default function Card({
  as: Element = "div",
  hasBorder = true,
  layer = "base",
  className = "",
  children,
  ...otherProps
}) {
  const borderColorByLayer = layer === "base" ? backgroundColor : borderColor;

  return (
    <Element
      {...otherProps}
      className={cx(
        css([
          {
            backgroundColor,
            borderRadius: "0.5rem",
            // Couper les bords rectangulaires des composants inclus dans la carte
            overflow: "hidden",
          },
          hasBorder && {
            border: `${borderWidth} solid ${borderColorByLayer}`,
          },
          Boolean(shadowSizes[layer]) && {
            boxShadow: `${shadowSizes[layer]} ${layerShadowColor}`,
          },
        ]),
        className
      )}
    >
      {children}
    </Element>
  );
}

Card.propTypes = {
  hasBorder: PropTypes.bool,
  layer: PropTypes.oneOf(LAYERS),
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
};
