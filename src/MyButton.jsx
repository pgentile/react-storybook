import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class MyButton extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.object,
    onClick: PropTypes.func
  };

  render() {
    const { label, icon, onClick } = this.props;

    return (
      <button onClick={onClick}>
        {icon && (
          <Fragment>
            <FontAwesomeIcon icon={icon} />
            &nbsp;
          </Fragment>
        )}
        <b>{label}</b>
      </button>
    );
  }
}
