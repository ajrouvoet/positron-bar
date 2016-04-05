const electron = window.require('electron');
const remote = electron.remote;
const childProc = remote.require('child_process');
import * as actions from 'actions';
import _ from 'lodash';

const spotify_current_cmd = "dbus-send --print-reply --session --dest=org.mpris.MediaPlayer2.spotify /org/mpris/MediaPlayer2 org.freedesktop.DBus.Properties.Get string:'org.mpris.MediaPlayer2.Player' string:'Metadata'";


export function spotifyPlayingProvider(dispatch) {
  childProc.exec(spotify_current_cmd, function(err, data) {
    data = {
      art_url: "http://o.scdn.co/image/5130e27b4e8de60be38721bc244640871960bfee",
      album: "Reject EP",
      artists: ["Jamie Lono"],
      title: "Elevators & Freight Trains (Acoustic)"
    };

    if(!err) {
      dispatch(actions.music.playing.receive(data));
    } else {
      console.error(err);
    }
  });
}
