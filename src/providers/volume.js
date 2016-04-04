const electron = window.require('electron');
const remote = electron.remote;
const childProc = remote.require('child_process');
import * as actions from 'actions';
import _ from 'lodash';

function getVolume(cb) {
  childProc.exec('amixer -c 0 get Master | grep Mono:', function (err, res) {
    if (err) { cb("Failed to get volume: " + err); }
		var volmatch = res.match(/.*\[(\d+)%\].*/);
		let muted = res.match(/.*\[(.*)\]\s*$/);
		if (!volmatch) {cb('Could not parse volume');}

    var volume;
		if (muted) {
      if(muted[1] === 'off') {
        console.log('muted');
        volume = 0;
      } else {
        volume = volmatch[1];
      }
    }

		cb(null, parseInt(volume, 10));
	});
}

export default function batteryProvider(dispatch) {
  getVolume((err, level) => {
    if(!err) {
      dispatch(actions.volume.receive({
        level: level
      }));
    }
  });
}
