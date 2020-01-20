import React from 'react'
import { connect } from "react-redux";
import { offUser } from "../redux/actions";


const OffUser = ({offUser, history}) => {
    return (
        <div>
            <button onClick={()=>offUser(history)}>Off User</button>
        </div>
    )
}

export default connect(
    null,
    { offUser }
  )(OffUser);
  