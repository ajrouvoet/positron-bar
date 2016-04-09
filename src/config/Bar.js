import React, {Component, PropTypes} from 'react';

import VDesktops from 'containers/VDesktops';
import Battery from 'containers/Battery';
import Volume from 'containers/Volume';
import Playing from 'containers/Playing';
import TodaysEvents from 'containers/TodaysEvents';
import Clock from 'components/Clock';
import Wifi from 'components/Wifi';

export default class Bar extends Component {
  render() {
    return (
      <div id="content">
        <div id="desktops">
          <VDesktops />
        </div>
        <div id="sysinfo">
          <TodaysEvents />
          <Clock />
          <Battery highThreshold={80} lowThreshold={20} />
          <Volume />
          <Wifi />
          <Playing />
        </div>
      </div>
    );
  }
}
