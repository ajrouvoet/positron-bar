const electron = window.require('electron');
const remote = electron.remote;
const childProc = remote.require('child_process');
import * as actions from 'actions';
import _ from 'lodash';

function get(cb) {
  childProc.exec('amixer -c 0 get Master | grep Mono:', function (err, res) {
    if (err) {
      console.error("Failed to get volume: " + err);
    }
		var volmatch = res.match(/.*\[(\d+)%\].*/);
		let muted = res.match(/.*\[(.*)\]\s*$/);
		if (!volmatch) {
      console.error('Could not parse volume');
    }

    var volume;
		if (muted) {
      if(muted[1] === 'off') {
        volume = 0;
      } else {
        volume = volmatch[1];
      }
    }

		cb({level: parseInt(volume, 10)});
	});
}

export function subscribe(cb, interval=1000) {
  // initial
  get(cb);

  // refresh
  window.setInterval(() => get((err, level) => {
    if(!err) {
      cb(level);
    }
  }), interval);
}
