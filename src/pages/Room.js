import React, { Component } from 'react'
import CreateUser from "../components/CreateUser";
import JoinUser from "../components/JoinUser";
import OffRoom from "../components/OffRoom";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        isCreateUserOn: false,
        isJoinUserOn: false
    };
  }

  handleCreateUserOn = ()=>{
    this.setState({ isCreateUserOn : true })
  }

  handleCreateUserOff = ()=>{
    this.setState({ isCreateUserOn : false })
  }

  handleJoinUserOn = ()=>{
    this.setState({ isJoinUserOn : true })
  }

  handleJoinUserOff = ()=>{
    this.setState({ isJoinUserOn : false })
  }

  render() {
    let {isCreateUserOn, isJoinUserOn} = this.state
    return (
      <div>
        <OffRoom history={this.props.history}/>
        {
        isCreateUserOn ? 
        <CreateUser handleCreateUserOff={this.handleCreateUserOff}/> : 
        <div onClick={()=>this.handleCreateUserOn()}>CreateUser</div>
        }
        {
        isJoinUserOn ? 
        <JoinUser handleJoinUserOff={this.handleJoinUserOff} history={this.props.history}/> : 
        <div onClick={()=>this.handleJoinUserOn()}>JoinUser</div>
        }
      </div>
    )
  }
}
