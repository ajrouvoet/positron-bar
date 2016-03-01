import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import _ from 'lodash';
import cs from 'classnames';

class VDesktops extends Component {

  static get propTypes() {
    return {
      active_desktop: PropTypes.string,
      desktops: PropTypes.arrayOf(PropTypes.string)
    };
  }

  clickedDesktop(name) {
    console.log("Woot, clicked " + name);
  }

  render() {
    let { active_desktop, desktops } = this.props;
    return (
      <ol>
        {
          _.map(desktops, (name) => {
            let cls = cs({focus: active_desktop == name});
            return <li
              className={cls}
              onClick={() => this.clickedDesktop(name)}
              key={name}>{name}</li>;
          })
        }
      </ol>
    );
  }
}

function select(state) {
  return {
    active_desktop: "Web",
    desktops: ["SH", "Web", "Code", "PDF"]
  };
}

export default connect(select)(VDesktops);
