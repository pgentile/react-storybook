import React from 'react';
import PropTypes from 'prop-types';

import Expandable from './Expandable';
import Card from './Card';

import './ExpandableCard.scss';


export default class ExpandableCard extends React.PureComponent {

  static propTypes = {
    ...Card.propTypes,
    expanded: Expandable.propTypes.expanded,
    expandableContent: PropTypes.node,
  };

  static defaultProps = {
    ...Card.defaultProps,
    expanded: false,
  };

  render() {
    const { expanded, expandableContent, children, className, ...otherProps } = this.props;
    const hasExpandableContent = !!expandableContent;

    return (
      <Card {...otherProps} className={`expandable-card ${className}`}>
        <div className="expandable-card__content">
          {children}
        </div>
        {hasExpandableContent && <Expandable expanded={expanded}>
          <div className="expandable-card__expandable">
            {expandableContent}
          </div>
        </Expandable>}
      </Card>
    );
  }

}
