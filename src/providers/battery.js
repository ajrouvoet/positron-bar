const electron = window.require('electron');
const remote = electron.remote;
import * as actions from 'actions';
const battery = remote.require('linux-battery');
import _ from 'lodash';

export default function batteryProvider(dispatch) {
  battery().then((info) => {
    let batteries = _(info).map((bat) => {
      return {
        level: parseInt(bat.percentage, 10),
        state: bat.state
      };
    }).value();

    dispatch(actions.battery.receive(batteries));
  });
}
