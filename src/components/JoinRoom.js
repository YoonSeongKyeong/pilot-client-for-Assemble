import React from "react";
import { connect } from "react-redux";
import { joinRoom } from "../redux/actions";

class JoinRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        roomId: "",
        password: ""
    };
  }

  updateRoomId = roomId => {
    this.setState({ roomId });
  };

  updatePassword = password => {
    this.setState({ password });
  };

  handleJoinRoom = () => {
    this.props.joinRoom({
        roomId: this.state.roomId, 
        password: this.state.password 
    });
    this.setState({ 
        roomId: "",
        password: ""
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.props.handleJoinRoomOff}>BackToHome</button> 
        <input className="roomId"
          onChange={e => this.updateRoomId(e.target.value)}
          value={this.state.roomId}
        />
        <input className="password"
          onChange={e => this.updatePassword(e.target.value)}
          value={this.state.password}
        />
        <button className="join-room" onClick={this.handleJoinRoom}>
          Join Room
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  { joinRoom }
)(JoinRoom);
