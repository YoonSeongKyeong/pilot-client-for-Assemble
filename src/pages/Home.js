import React, { Component } from 'react'
import CreateRoom from "../components/CreateRoom";
import JoinRoom from "../components/JoinRoom";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        isCreateRoomOn: false,
        isJoinRoomOn: false
    };
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
        <JoinRoom handleJoinRoomOff={this.handleJoinRoomOff}/> : 
        <div onClick={()=>this.handleJoinRoomOn()}>JoinRoom</div>
        }
      </div>
    )
  }
}
