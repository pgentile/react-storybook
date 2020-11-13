import PropTypes from "prop-types";
import { css } from "@emotion/css";

const marginSize = "0.5rem";

export default function CssVarConsumer({ customColor }) {
  return (
    <div
      className={css({
        ["--customColor"]: customColor,
        border: "3px solid var(--customColor)",
        padding: marginSize,
      })}
    >
      <p
        className={css({
          margin: 0,
          padding: 0,
          backgroundColor: "white",
          color: "black",
        })}
      >
        C&apos;est formidable, les variables CSS.
      </p>
      <div
        className={css({
          marginTop: marginSize,
          height: `calc(${marginSize} * 4)`,
          backgroundColor: "var(--customColor)",
        })}
      />
    </div>
  );
}

CssVarConsumer.propTypes = {
  customColor: PropTypes.string.isRequired,
};
