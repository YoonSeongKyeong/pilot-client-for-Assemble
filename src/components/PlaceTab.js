import React from "react";
import { connect } from "react-redux";
// import { createRoom } from "../redux/actions";

class PlaceTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  render() {
    return (
      <div>
          장소
      </div>
    );
  }
}

export default connect(
//   null,
//   { createRoom }
)(PlaceTab);
