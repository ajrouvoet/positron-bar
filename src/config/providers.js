const electron = window.require('electron');
const remote = electron.remote;
const x11 = remote.require('x11');

import batteryProvider from 'providers/battery';
import volumeProvider from 'providers/volume';
import {ewmhDesktopsProvider} from 'providers/ewmh';
import {spotifyPlayingProvider} from 'providers/spotify';
import * as actions from 'actions';

export default function installProviders(store) {
  // initial data loading
  batteryProvider(store.dispatch)
  volumeProvider(store.dispatch)
  ewmhDesktopsProvider(store.dispatch);

  // polling
  window.setInterval(() => batteryProvider(store.dispatch), 10000);
  window.setInterval(() => {
    volumeProvider(store.dispatch);
    spotifyPlayingProvider(store.dispatch);
  }, 1000);

  // install the ewmhDesktopsProvider to run on substructureNotify events from the X server
  x11.createClient((err, display) => {
    if (err) {throw err;}

    let X = display.client;
    let root = display.screen[0].root;

    // subscribe to substructure events
    X.ChangeWindowAttributes(root, {
      eventMask: x11.eventMask.SubstructureNotify|x11.eventMask.SubstructurRedirect
    });

    // get the desktop data on changes
    X.on('event', (ev) => ewmhDesktopsProvider(store.dispatch));
  });
}
