import React, {Component, PropTypes} from 'react';
import Bar from 'components/Bar';
import SysInfo from 'components/SysInfo';
import {connect} from 'react-redux';

class Volume extends Component {
  static get propTypes() {
    return {
      level: PropTypes.number.isRequired
    };
  }

  render() {
    let {level} = this.props;

    return <SysInfo>
      <i className="fa fa-volume-up" />
      <Bar percentage={level} />
    </SysInfo>;
  }
}

function select(state) {
  return {
    level: state.volume.level
  };
}

export default connect(select)(Volume);
