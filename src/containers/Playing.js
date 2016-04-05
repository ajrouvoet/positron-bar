import React, {Component, PropTypes} from 'react';
import Bar from 'components/Bar';
import SysInfo from 'components/SysInfo';
import cs from 'classnames';
import {connect} from 'react-redux';
import _ from 'lodash';

class Playing extends Component {
  static get propTypes() {
    return {
      song: PropTypes.object
    };
  }

  render() {
    var {song} = this.props;

    if(song) {
      
      return <SysInfo className="playing">
        <img src={song.art_url} />
        <p>{song.title}</p>
      </SysInfo>;
    } else { return false };
  }
}

function select(state) {
  console.log(state);
  return {
    song: state.music.playing
  };
}

export default connect(select)(Playing);
