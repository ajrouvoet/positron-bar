import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import _ from 'lodash';
import cs from 'classnames';

const electron = window.require('electron');
const remote = electron.remote;
const childProcess = remote.require('child_process');

class VDesktops extends Component {

  static get propTypes() {
    return {
      desktops: PropTypes.arrayOf(PropTypes.object)
    };
  }

  clickedDesktop(index) {
    childProcess.exec(`wmctrl -s ${index}`);
  }

  render() {
    let { active_desktop, desktops } = this.props;
    return (
      <ol>
        {
          _.map(desktops, (desktop) => {
            let cls = cs({focus: desktop.current});
            return <li
              className={cls}
              key={desktop.index}
              onClick={() => this.clickedDesktop(desktop.index)}>{desktop.name}</li>;
          })
        }
      </ol>
    );
  }
}

function select(state) {
  let {ewmh: {desktops}} = state;

  return {desktops};
}

export default connect(select)(VDesktops);
