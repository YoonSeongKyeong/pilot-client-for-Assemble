import React from "react";
import { connect } from "react-redux";
import { createRoom } from "../redux/actions";

class CreateRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        roomname: "",
        password: ""
    };
  }

  updateRoomname = roomname => {
    this.setState({ roomname });
  };

  updatePassword = password => {
    this.setState({ password });
  };

  handleCreateRoom = () => {
    this.props.createRoom({
        roomname: this.state.roomname, 
        password: this.state.password
    });
    this.setState({ 
        roomname: "",
        password: ""
    });
  };

  render() {
    return (
      <div>

        <button onClick={this.props.handleCreateRoomOff}>Back To Home</button> 
        <input className="roomname"
          onChange={e => this.updateRoomname(e.target.value)}
          value={this.state.roomname}
        />
        <input className="password"
          onChange={e => this.updatePassword(e.target.value)}
          value={this.state.password}
        />
        <button className="create-room" onClick={this.handleCreateRoom}>
          Create Room
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  { createRoom }
)(CreateRoom);
