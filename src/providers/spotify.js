const electron = window.require('electron');
const remote = electron.remote;
const childProc = remote.require('child_process');
const dbus = remote.require('dbus-native');
import * as actions from 'actions';
import _ from 'lodash';

function subscribePropertiesChanged(bus, onError, onNext) {
  bus.getInterface(
    'org.mpris.MediaPlayer2.spotify',
    '/org/mpris/MediaPlayer2',
    'org.freedesktop.DBus.Properties',
    (err, iface) => {
      console.log("?", err, iface);
      if(err) {
        onError(err || "Spotify doesn't seem to be running yet");
        return;
      }

      iface.on('PropertiesChanged', (name, [data]) => {
        let metadata = _.fromPairs(data[1][1][0]);
        onNext({
          art_url: metadata['mpris:artUrl'][1][0],
          album: metadata['xesam:album'][1][0],
          artists: metadata['xesam:artist'][1][0],
          title: metadata['xesam:title'][1][0],
        });
      });
    });
}

function subscribeSpotifyStartOnce(bus, cb) {
  bus.getInterface(
    'org.freedesktop.DBus',
    '/org/freedesktop/DBus',
    'org.freedesktop.DBus',
    (err, iface) => {
      let onNameOwnerChanged = (name, x, owner) => {
        if(name == 'org.mpris.MediaPlayer2.spotify' && owner != "") {
          // make sure we don't resubscribe when spotify start again
          iface.removeListener('NameOwnerChanged', onNameOwnerChanged);
          cb();
        }
      };

      iface.on('NameOwnerChanged', onNameOwnerChanged);
  });
}

export function subscribe(dispatch) {
  let bus = dbus.sessionBus();
  let onNext = (data) => dispatch(actions.music.playing.receive(data));

  // try and subscribe to spotify
  // if spotify is not yet running, this function throws and
  // we listen for it to start and then subscribe
  subscribePropertiesChanged(bus,
    (err) => subscribeSpotifyStartOnce(bus, () => subscribePropertiesChanged(bus, () => {}, onNext)),
    onNext
  );
}
