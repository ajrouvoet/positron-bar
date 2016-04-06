const electron = window.require('electron');
const remote = electron.remote;
const childProc = remote.require('child_process');
const dbus = remote.require('dbus-native');
import * as actions from 'actions';
import _ from 'lodash';

export function subscribe(dispatch) {
  var bus = dbus.sessionBus();
  bus.getInterface(
    'org.mpris.MediaPlayer2.spotify',
    '/org/mpris/MediaPlayer2',
    'org.freedesktop.DBus.Properties',
    (err, iface) => {
      iface.on('PropertiesChanged', (name, [data]) => {
        let metadata = _.fromPairs(data[1][1][0]);
        dispatch(actions.music.playing.receive({
          art_url: metadata['mpris:artUrl'][1][0],
          album: metadata['xesam:album'][1][0],
          artists: metadata['xesam:artist'][1][0],
          title: metadata['xesam:title'][1][0],
        }));
      });
    });
}
