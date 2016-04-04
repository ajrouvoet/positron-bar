import React, {Component, PropTypes} from 'react';
import Bar from './Bar';
import SysInfo from './SysInfo';

export default class Wifi extends Component {
  render() {
    return <SysInfo>
      <i className="fa fa-wifi" />
      <Bar percentage={60} />
      </SysInfo>;
  }
}
