import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

window.$ = $;

export default class VDesktops extends Component {

  render() {
    return (
      <ol>
        <li>SH</li>
        <li>Web</li>
        <li className="focus">Code</li>
        <li>PDF</li>
      </ol>
    );
  }
}

render(<VDesktops />, $("#inject-react")[0]);
