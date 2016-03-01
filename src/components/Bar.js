import React, {Component, PropTypes} from 'react';

export default class Bar extends Component {

  static get propTypes() {
    return {
      percentage: PropTypes.number.isRequired
    };
  }

  render() {
    return <div className="bar-indicator">
      <div className="bar-container">
        <div style={{width: this.props.percentage + '%'}}className="bar-fill"></div>
      </div>
    </div>;
  }
}
