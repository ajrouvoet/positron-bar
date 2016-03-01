import React, {Component, PropTypes} from 'react';
import Bar from './Bar';
import SysInfo from './SysInfo';

export default class Volume extends Component {
  render() {
    return <SysInfo>
      <p>Vol.&nbsp;</p>
      <Bar percentage={40} />
    </SysInfo>;
  }
}
