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
      format: "[<strong>]H:mm[</strong>] on [<strong>]MMMM Do[</strong>]"
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
        <i className="fa fa-clock-o" />
        <p id="clock" dangerouslySetInnerHTML={{__html: this.state.now.format(this.props.format)}}></p>
      </SysInfo>
    );
  }
}
