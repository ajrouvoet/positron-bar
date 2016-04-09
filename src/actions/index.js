export let providers = {
  ADD: 'PROVIDER_ADD',

  add: function(name, interval) {
    return {
      type: providers.ADD,
      name,
      interval
    };
  }

};

export let volume = {
  RECEIVE: 'VOLUME_RECEIVE',

  receive: function(info) {
    return {
      type: volume.RECEIVE,
      level: info.level
    };
  }
};

export let battery = {
  RECEIVE: 'BATTERY_RECEIVE',

  receive: function(batteries) {
    return {
      type: battery.RECEIVE,
      batteries
    };
  }
};

export let ewmh = {

  desktops : {
    RECEIVE: 'EWMH_DESKTOPS_RECEIVE',

    receive: function(desktops) {
      return {
        type: ewmh.desktops.RECEIVE,
        desktops
      };
    }
  }
};

export let music = {

  playing: {
    RECEIVE: 'MUSIC_PLAYING_RECEIVE',

    receive: function(song) {
      return {
        type: music.playing.RECEIVE,
        song
      };
    }
  }
};

export let calendar = {
  
  todaysEvents: {
    RECEIVE: 'CALENDAR_TODAY_RECEIVE',

    receive: (events) => {
      return {
        type: calendar.todaysEvents.RECEIVE,
        events
      };
    }
  }
};
