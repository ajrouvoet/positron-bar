const electron = window.require('electron');
const remote = electron.remote;
const childProc = remote.require('child_process');
import * as actions from 'actions';
import _ from 'lodash';

function getVolume(cb) {
  childProc.exec('amixer -c 0 get Master | grep Mono:', function (err, res) {
    if (err) { cb("Failed to get volume: " + err); }
		var matches = res.match(/.*\[(\d+)%\].*/);
		if (!matches) {cb('Could not parse volume');}

		cb(null, parseInt(matches[1], 10));
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
