import React from "react";
import { connect } from "react-redux";
import { joinUser } from "../redux/actions";

class JoinUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        username: ""
    };
  }

  updateUsername = username => {
    this.setState({ username });
  };

  handleJoinRoom = () => {
    this.props.joinRoom({
        username: this.state.username
    }, this.props);
    this.setState({ 
        username: ""
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.props.handleJoinRoomOff}>Close</button> 
        <input className="username"
          onChange={e => this.updateUsername(e.target.value)}
          value={this.state.roomId}
        />
        <button className="join-user" onClick={this.handleJoinUser}>
          Join Room
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  { joinUser }
)(JoinUser);
