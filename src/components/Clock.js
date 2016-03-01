import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import SysInfo from './SysInfo';

export default class DigitalClock extends Component {

  static get propTypes() {
    return {
      formatTime: PropTypes.string,
      formatDate: PropTypes.string
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

    window.setInterval(
      () => this.setState({ now : moment() }),
      1000
    );
  }

  render() {
    return (
      <SysInfo>
        <p id="clock">{this.state.now.format(this.props.format)}</p>
      </SysInfo>
    );
  }
}
