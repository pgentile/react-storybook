import React from 'react';
import PropTypes from 'prop-types';

import './ProgressButton.scss';


// See https://codepen.io/teamturret/pen/KwyVQx
export default class ProgressButton extends React.PureComponent {

  static propTypes = {
    loading: PropTypes.bool,
    finished: PropTypes.bool,
    children: PropTypes.node,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    loading: false,
    finished: true,
  };

  onClick = (event) => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(event);
    }
  };

  render() {
    const { loading, finished, children, ...otherProps } = this.props;

    return (
      <button className="progress-button" {...otherProps} onClick={this.onClick}>
        <div className="progress-button__content">
          {children}
        </div>
        <div className={`progress-button__progress-bar ${loading && !finished ? 'progress-button__progress-bar_loading' : ''} ${finished ? 'progress-button__progress-bar_finished' : ''}`} />
      </button>
    );
  }

}
