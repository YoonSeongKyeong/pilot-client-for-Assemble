import React from "react";
import { connect } from "react-redux";
// import { createRoom } from "../redux/actions";

class MenuTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  render() {
    return (
      <div>
          메뉴
      </div>
    );
  }
}

export default connect(
//   null,
//   { createRoom }
)(MenuTab);
