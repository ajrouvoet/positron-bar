import {combineReducers, createStore} from 'redux';
import * as actions from 'actions';

function ewmh(state={}, action) {
  switch(action.type) {
    case (actions.ewmh.desktops.RECEIVE):
      return _.extend({}, state, {
        desktops: action.desktops
      });
    default:
     return state;
  }
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

function music(state={playing: undefined}, action) {
  switch(action.type) {
    case (actions.music.playing.RECEIVE):
      return _.extend({}, state, {
        playing: action.song
      });
  default:
    return state;
  }
}

function calendar(state={todaysEvents: []}, action) {
  switch(action.type) {
    case (actions.calendar.todaysEvents.RECEIVE):
      return _.extend({}, state, {
        todaysEvents: action.events
      });
    default:
      return state;
  }
}

export default createStore(combineReducers({
  ewmh,
  batteries,
  volume,
  music,
  calendar
}));
