import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import {Provider, connect} from 'react-redux';
import store from 'store';

window.$ = $;

import installProviders from 'config/providers';
import Bar from 'config/Bar';

// init the providers
installProviders(store);

// render the bar
render(<Provider store={store}><Bar /></Provider>, $("#react-inject")[0]);
