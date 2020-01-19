import React, { Component } from 'react'
import CreateRoom from "../components/CreateRoom";
import JoinRoom from "../components/JoinRoom";
import { connect } from "react-redux";
import { shortcutFromMemory } from "../redux/actions";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        isCreateRoomOn: false,
        isJoinRoomOn: false
    };
  }

  componentDidMount = () => {
    this.props.shortcutFromMemory(this.props)
  }

  handleCreateRoomOn = ()=>{
    this.setState({ isCreateRoomOn : true })
  }

  handleCreateRoomOff = ()=>{
    this.setState({ isCreateRoomOn : false })
  }

  handleJoinRoomOn = ()=>{
    this.setState({ isJoinRoomOn : true })
  }

  handleJoinRoomOff = ()=>{
    this.setState({ isJoinRoomOn : false })
  }

  render() {
    let {isCreateRoomOn, isJoinRoomOn} = this.state
    return (
      <div>
        {
        isCreateRoomOn ? 
        <CreateRoom handleCreateRoomOff={this.handleCreateRoomOff}/> : 
        <div onClick={()=>this.handleCreateRoomOn()}>CreateRoom</div>
        }
        {
        isJoinRoomOn ? 
        <JoinRoom handleJoinRoomOff={this.handleJoinRoomOff} history={this.props.history}/> : 
        <div onClick={()=>this.handleJoinRoomOn()}>JoinRoom</div>
        }
      </div>
    )
  }
}

export default connect(
  null,
  { shortcutFromMemory }
)(Home);