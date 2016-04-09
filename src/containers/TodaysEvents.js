const electron = window.require('electron');
const remote = electron.remote;

import React, {Component, PropTypes} from 'react';
import SysInfo from 'components/SysInfo';
import {connect} from 'react-redux';

class TodaysEvents extends Component {
  static get propTypes() {
    return {
      events: PropTypes.array.isRequired
    };
  }

  render() {
    let {events} = this.props;

    return <SysInfo className="todays-events">
      <i className="no">{events.length}</i>
      <i className="label">events</i>
    </SysInfo>;
  }
}

function select(state) {
  return {
    events: state.calendar.todaysEvents
  };
}

export default connect(select)(TodaysEvents);
