import React from "react";
import { connect } from "react-redux";
// import { createRoom } from "../redux/actions";

class PaymentTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  render() {
    return (
      <div>
          결제정보
      </div>
    );
  }
}

export default connect(
//   null,
//   { createRoom }
)(PaymentTab);
