import {combineReducers, createStore} from 'redux';
import * as actions from 'actions';

function vdesktops(state=[], action) {
  return state;
}

function batteries(state=[], action) {
  switch(action.type) {
    case (actions.battery.RECEIVE):
      return action.batteries;
    default:
      return state;
  }
}

function volume(state={level: 50}, action) {
  switch(action.type) {
    case (actions.volume.RECEIVE):
      return {
        level: action.level
      };
    default:
      return state;
  }
}

function providers(state={}, action) {
  switch(action.type) {
    case (actions.providers.ADD):
      return {
        [action.name]: action.interval
      };

    default:
      return state;
  }
}

export default createStore(combineReducers({
  vdesktops,
  batteries,
  volume,
  providers
}));
