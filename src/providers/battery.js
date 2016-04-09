const electron = window.require('electron');
const remote = electron.remote;
import * as actions from 'actions';
const battery = remote.require('linux-battery');
import _ from 'lodash';

export function get(cb) {
  battery().then((info) => {
    let batteries = _(info).map((bat) => {
      return {
        level: parseInt(bat.percentage, 10),
        state: bat.state
      };
    }).value();

    cb(batteries);
  });
}

export function subscribe(cb, interval=10000) {
  // initial
  get(cb);

  // refresh
  window.setInterval(() => get(cb), interval);
}
