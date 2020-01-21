import React, { Component } from 'react'
import { connect } from "react-redux";
import { shortcutFromMemory } from "../redux/actions";

import CreateRoom from "../antDesignComponents/CreateRoom"
import JoinRoom from "../antDesignComponents/JoinRoom"


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  componentDidMount = () => {
    this.props.shortcutFromMemory(this.props)
  }

  render() {
    return (
      <div className="main-button-container">
        <div className="first-title">ASSEMBLE</div>
        <JoinRoom history={this.props.history}/>
        <CreateRoom />
      </div>
    )
  }
}

export default connect(
  null,
  { shortcutFromMemory }
)(Home);







