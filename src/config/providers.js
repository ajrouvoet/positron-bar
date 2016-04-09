const electron = window.require('electron');
const remote = electron.remote;
const x11 = remote.require('x11');

import {ewmhDesktopsProvider} from 'providers/ewmh';
import * as battery from 'providers/battery';
import * as spotify from 'providers/spotify';
import * as calendar from 'providers/calendar';
import * as volume from 'providers/volume';
import * as actions from 'actions';

export default function installProviders(store) {
  let dispatch = store.dispatch;

  // initial data loading
  ewmhDesktopsProvider(store.dispatch);

  // polling
  battery.subscribe((data) => dispatch(actions.battery.receive(data)));
  volume.subscribe((data) => dispatch(actions.volume.receive(data)));

  spotify.subscribe((data) => dispatch(actions.music.playing.receive(data)));
  calendar.subscribe((items) => dispatch(actions.calendar.todaysEvents.receive(items)));

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
