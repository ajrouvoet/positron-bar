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

const electron = window.require('electron');
const remote = electron.remote;
const x11 = remote.require('x11');

window.$ = $;

class Bar extends Component {
  render() {
    return (
      <div id="content">
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
import {ewmhDesktopsProvider} from 'providers/ewmh';
import * as actions from 'actions';

// bundle some providers into single interval for sysinfo
batteryProvider(store.dispatch)
window.setInterval(() => batteryProvider(store.dispatch), 10000);

volumeProvider(store.dispatch)
window.setInterval(() => volumeProvider(store.dispatch), 1000);

// install the ewmhDesktopsProvider to run on substructureNotify events
// from an x11 client
// start with initial info load
ewmhDesktopsProvider(store.dispatch);
x11.createClient(function(err, display) {
  if (err) {
    throw err;
  }
  let X = display.client;
  let root = display.screen[0].root;
  X.ChangeWindowAttributes(root, { eventMask: x11.eventMask.SubstructureNotify|x11.eventMask.SubstructurRedirect});
  X.on('event', (ev) => ewmhDesktopsProvider(store.dispatch));

  x11.createClient(function(err, display) {});
});
