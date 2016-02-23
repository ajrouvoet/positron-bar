import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import {Provider, connect} from 'react-redux';
import store from 'store';

import VDesktops from 'containers/VDesktops';
import Clock from 'components/Clock';

window.$ = $;

class Bar extends Component {
  render() {
    return (
      <div id="content">
        <div id="focus">
        </div>
        <div id="desktops">
          <VDesktops />
        </div>
        <div id="sysinfo">
          <Clock />
        </div>
      </div>
    );
  }
}

render(<Provider store={store}>
         <Bar />
       </Provider>, $("#react-inject")[0]);
