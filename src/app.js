import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import moment from 'moment';

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

class DigitalClock extends Component {

  static get propTypes() {
    return {
      format: PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      format: "H:mm on MMM Qo YYYY"
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      now: moment()
    };
  }

  render() {
    return (
      <p>{this.state.now.format(this.props.format)}</p>
    );
  }
}

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
          <DigitalClock />
        </div>
      </div>
    );
  }
}

render(<Bar />, $("#react-inject")[0]);
