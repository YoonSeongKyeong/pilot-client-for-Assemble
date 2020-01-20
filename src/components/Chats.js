import React from "react";
import { connect } from "react-redux";
// import { createRoom } from "../redux/actions";

class Chats extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  render() {
    return (
      <div>
          채팅이 들어갈 곳
      </div>
    );
  }
}

export default connect(
//   null,
//   { createRoom }
)(Chats);
