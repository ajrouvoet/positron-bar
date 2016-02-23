import React, {Component, PropTypes} from 'react';
import moment from 'moment';

export default class DigitalClock extends Component {

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

    window.setInterval(
      () => this.setState({ now : moment() }),
      1000
    );
  }

  render() {
    return (
        <p>{this.state.now.format(this.props.format)}</p>
    );
  }
}
