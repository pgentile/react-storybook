import PropTypes from "prop-types";

import FieldError from "../forms/FieldError";
import useFieldError from "./useFieldError";

export default function FinalFieldError({ name }) {
  const error = useFieldError(name);

  if (!error) {
    return null;
  }

  return <FieldError>{error}</FieldError>;
}

FinalFieldError.propTypes = {
  name: PropTypes.string.isRequired,
};
