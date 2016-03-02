import React, {Component, PropTypes} from 'react';
import Bar from 'components/Bar';
import SysInfo from 'components/SysInfo';
import cs from 'classnames';
import {connect} from 'react-redux';
import _ from 'lodash';

class Battery extends Component {
  static get propTypes() {
    return {
      lowThreshold: PropTypes.number,
      highThreshold: PropTypes.number,
      batteries: PropTypes.array.isRequired
    };
  }

  static get defaultProps() {
    return {
      lowThreshold: -1,
      highThreshold: 101
    };
  }

  render() {

    var {batteries, lowThreshold, highThreshold} = this.props;

    return (
      <SysInfo>
        <p>Bat.&nbsp;</p>
        {
          _.map(batteries, (bat, id) => {
            let { level, state } = bat;

            level = level > 100 ? 100 : level;
            level = level < 0 ? 0 : level;

            let clazz = cs({
              low: level <= lowThreshold,
              high: level >= lowThreshold
            });

            return <Bar key={id} percentage={level} className={clazz} />;
          })
        }
      </SysInfo>);
  }
}

function select(state) {
  return {
    batteries: state.batteries
  };
}

export default connect(select)(Battery);
