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
