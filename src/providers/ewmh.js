const electron = window.require('electron');
const remote = electron.remote;
const childProc = remote.require('child_process');
import * as actions from 'actions';
import _ from 'lodash';

const wmctrlDesktopsRegex = /(\d+) {2}([*-]) DG: (?:[0-9x]+|N\/A) {2}VP: (?:[0-9x]|N\/A) {2}WA: (?:\d+,\d+\s\d+x\d+|N\/A)\s+(.*)/;

function desktops(cb) {
  childProc.exec('wmctrl -d', function(err, data) {
    if(err) return cb(err, null);
    cb(null, _(data.split('\n'))
       .filter((line) => line.trim().length !== 0)
       .map((line) => {
          let matches = line.match(wmctrlDesktopsRegex);
          if(matches) {
            let index = parseInt(matches[1], 10);
            let current = matches[2] === '*';
            let name = matches[3];

            return {index, current, name};
          }
        })
       .value());
  });
};

export function ewmhDesktopsProvider(dispatch) {
  desktops((err, data) => {
    if(!err) {
      dispatch(actions.ewmh.desktops.receive(data));
    } else {
      console.error(err);
    }
  });
}
