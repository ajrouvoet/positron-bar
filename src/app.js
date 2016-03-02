import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import {Provider, connect} from 'react-redux';
import store from 'store';

import VDesktops from 'containers/VDesktops';
import Battery from 'containers/Battery';
import Volume from 'containers/Volume';
import Clock from 'components/Clock';
import Wifi from 'components/Wifi';

window.$ = $;

class Bar extends Component {
  render() {
    return (
      <div id="content">
        <div id="focus">
        </div>
        <div id="desktops">
          <VDesktops />
        </div>
        <div id="sysinfo">
          <Clock />
          <Volume />
          <Battery highThreshold={80} lowThreshold={20} />
          <Wifi />
        </div>
      </div>
    );
  }
}

render(
  <Provider store={store}>
    <Bar />
  </Provider>,
  $("#react-inject")[0]);

// providers
import batteryProvider from 'providers/battery';
import volumeProvider from 'providers/volume';
import * as actions from 'actions';

function installProvider(name, provider, delay=1000) {
  let interval = window.setInterval(() => provider(store.dispatch), delay);
  store.dispatch(actions.providers.add(name, interval));
}

installProvider("battery", batteryProvider, 3000);
installProvider("volume", volumeProvider, 3000);
