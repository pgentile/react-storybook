import React from 'react';

import './Spinner.scss';


// See http://tobiasahlin.com/spinkit/
export default class Spinner extends React.PureComponent {

  render() {
    return (
      <div className="spinner">
        <div className="spinner__bounce" />
        <div className="spinner__bounce" />
        <div className="spinner__bounce" />
      </div>
    );
  }

}
