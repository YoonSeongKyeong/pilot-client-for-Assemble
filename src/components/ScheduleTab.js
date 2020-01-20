import React from "react";
import { connect } from "react-redux";
// import { createRoom } from "../redux/actions";

class ScheduleTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  render() {
    return (
      <div>
          일정
      </div>
    );
  }
}

export default connect(
//   null,
//   { createRoom }
)(ScheduleTab);
