import React from "react";
import { connect } from "react-redux";
import { createUser } from "../redux/actions";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        username: "",
    };
  }

  updateUsername = username => {
    this.setState({ username });
  };

  handleCreateUser = () => {
    this.props.createUser({
        username: this.state.username,
    });
    this.setState({ 
        username: ""
    });
  };

  render() {
    return (
      <div>

        <button onClick={this.props.handleCreateUserOff}>Close</button> 
        <input className="username"
          onChange={e => this.updateUsername(e.target.value)}
          value={this.state.username}
        />
        <button className="create-user" onClick={this.handleCreateUser}>
          Create User
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  { createUser }
)(CreateUser);
