import React from 'react';
import PropTypes from 'prop-types';

import './Wip.scss';


export default class Wip extends React.PureComponent {

  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;
    return (
      <div className="wip">
        <div className="wip__container">
          {children || 'Work in progress'}
        </div>
      </div>
    );
  }

}
