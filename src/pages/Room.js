import React, { Component } from 'react'
import CreateUser from "../antDesignComponents/CreateUser";
import JoinUser from "../antDesignComponents/JoinUser";
import OffRoom from "../antDesignComponents/OffRoom";
import { connect } from "react-redux";
import { shortcutFromMemory } from "../redux/actions";

class Room extends Component {
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
        <JoinUser history={this.props.history} />
        <CreateUser />
        <OffRoom history={this.props.history}/>
      </div>
    )
  }
}

export default connect(
  null,
  { shortcutFromMemory }
)(Room);