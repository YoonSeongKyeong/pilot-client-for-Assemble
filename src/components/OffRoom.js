import React from 'react'
import { connect } from "react-redux";
import { offRoom } from "../redux/actions";


const OffRoom = ({offRoom, history}) => {
    return (
        <div>
            <button onClick={()=>offRoom(history)}>Off Room</button>
        </div>
    )
}

export default connect(
    null,
    { offRoom }
  )(OffRoom);
  