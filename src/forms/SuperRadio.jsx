import React, { createRef } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import ExpandableCard from "../ExpandableCard";

import "./SuperRadio.scss";
import bemModifiers from "../utils/bemModifiers";

export default class SuperRadio extends React.PureComponent {
  static propTypes = {
    label: PropTypes.node.isRequired,
    icon: PropTypes.object,
    description: PropTypes.node,
    help: PropTypes.node,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static counter = 0;

  state = {
    showHelp: false,
  };

  inputRef = createRef();
  inputId = `super-radio-${++SuperRadio.counter}`;

  selectRadio = (event) => {
    event.stopPropagation();

    const input = this.inputRef.current;
    if (input && !input.checked) {
      input.focus();
      input.click();
    }
  };

  toggleHelp = (event) => {
    event.stopPropagation();

    this.setState((prevState) => {
      return {
        showHelp: !prevState.showHelp,
      };
    });
  };

  stopPropagation = (event) => {
    event.stopPropagation();
  };

  render() {
    const { label, icon, description, help, checked, onChange } = this.props;
    const { showHelp } = this.state;

    const realClassName = bemModifiers("super-radio", {
      checked,
    });

    return (
      <ExpandableCard className={realClassName} expandableContent={help} expanded={showHelp} hasBorder layer="flat">
        <div className="super-radio__main-container" onClick={this.selectRadio}>
          <div className="super-radio__radio-element">
            <input
              ref={this.inputRef}
              type="radio"
              id={this.inputId}
              checked={checked}
              onChange={onChange}
              onClick={this.stopPropagation}
            />
          </div>
          {icon && (
            <div className="super-radio__icon">
              <label htmlFor={this.inputId} onClick={this.stopPropagation}>
                <FontAwesomeIcon icon={icon} size="3x" />
              </label>
            </div>
          )}
          <div className="super-radio__description">
            <p className="super-radio__description-title">
              <label htmlFor={this.inputId}>{label}</label>
            </p>
            {description && <p className="super-radio__description-description">{description}</p>}
          </div>
          {help && (
            <div className="super-radio__help">
              <a className="super-radio__help-link" onClick={this.toggleHelp}>
                <FontAwesomeIcon className="super-radio__help-icon" icon={faQuestionCircle} size="1x" />
              </a>
            </div>
          )}
        </div>
      </ExpandableCard>
    );
  }
}
