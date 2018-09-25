import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import Overlay from "./Overlay";
import Card from "./Card";

import "./Modal.scss";

export default class Modal extends React.PureComponent {
  static count = 0;

  static propTypes = {
    title: PropTypes.node,
    onClose: PropTypes.func,
    children: PropTypes.node
  };

  static defaultProps = {};

  generatedId = `modal-${Modal.count++}`;

  onOverlayClick = event => {
    if (this.props.onClose && event.target === event.currentTarget) {
      event.stopPropagation();
      this.props.onClose();
    }
  };

  onCloseButtonClick = event => {
    if (this.props.onClose) {
      event.stopPropagation();
      this.props.onClose();
    }
  };

  render() {
    const { title, children, onClose } = this.props;
    const closeable = !!onClose;

    return (
      <Overlay onClick={this.onOverlayClick}>
        <div className="modal" onClick={this.onOverlayClick}>
          <Card
            className="modal__card"
            layer="pop-out"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title && this.generatedId}
          >
            {title && (
              <div className="modal__header">
                <h1 id={this.generatedId} className="modal__title">
                  {title}
                </h1>
                {closeable && (
                  <button className="modal__close" onClick={this.onCloseButtonClick} title="Fermer">
                    <FontAwesomeIcon icon={faTimesCircle} size="lg" />
                  </button>
                )}
              </div>
            )}
            <div className="modal__content">{children}</div>
          </Card>
        </div>
      </Overlay>
    );
  }
}
