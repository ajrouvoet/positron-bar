import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import _ from 'lodash';

class VDesktops extends Component {

  static get propTypes() {
    return {
      active_desktop: PropTypes.string,
      desktops: PropTypes.arrayOf(PropTypes.string)
    };
  }

  render() {
    return (
      <ol>{ _.map(this.props.desktops, (name) => <li key={name}>{name}</li>) }</ol>
    );
  }
}

function select(state) {
  return {
    active_desktop: "Web",
    desktops: ["SH", "Web", "Code", "PDF"]
  };
}

export default connect(select)(VDesktops);
