import React from 'react';
import PropTypes from 'prop-types';

import './Card.scss';


export default class Card extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const { className, children } = this.props;

    return (
      <div className={`card ${className}`}>
        {children}
      </div>
    );
  }

}
