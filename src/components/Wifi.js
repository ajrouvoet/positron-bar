import React, {Component, PropTypes} from 'react';
import Bar from './Bar';
import SysInfo from './SysInfo';

export default class Wifi extends Component {
  render() {
    return <SysInfo>
      <p>WIFI.&nbsp;</p>
      <Bar percentage={60} />
      </SysInfo>;
  }
}
