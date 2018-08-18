import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";

import Expandable from "./Expandable";
import Card from "./Card";
import FlatButton from "./FlatButton";

import "./ExpandableCard.scss";

export default class ExpandableCard extends React.PureComponent {
  static propTypes = {
    ...Card.propTypes,
    expanded: Expandable.propTypes.expanded,
    expandableContent: PropTypes.node,
    onFold: PropTypes.func
  };

  static defaultProps = {
    ...Card.defaultProps,
    expanded: false
  };

  onFold = () => {
    this.props.onFold();
  };

  render() {
    const { expanded, expandableContent, children, className, onFold, ...otherProps } = this.props;
    const hasExpandableContent = !!expandableContent;
    const hasFoldButton = !!onFold;

    return (
      <Card {...otherProps} className={`expandable-card ${className}`}>
        <div className="expandable-card__content">{children}</div>
        {hasExpandableContent && (
          <Expandable expanded={expanded}>
            <div className="expandable-card__expandable">{expandableContent}</div>
            {hasFoldButton && (
              <FlatButton className="expandable-card__fold-button" onClick={this.onFold}>
                <FontAwesomeIcon icon={faAngleDoubleUp} />
              </FlatButton>
            )}
          </Expandable>
        )}
      </Card>
    );
  }
}
