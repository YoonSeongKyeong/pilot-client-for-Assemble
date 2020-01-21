import React from 'react'
import { connect } from "react-redux";
import { offRoom } from "../redux/actions";

import { Button } from 'antd';
import 'antd/dist/antd.css';

const OffRoom = ({offRoom, history}) => {
    return (
        <div>
            <Button className="main-button" type="danger" shape="round" icon="left" onClick={()=>offRoom(history)}>back</Button>
        </div>
    )
}

export default connect(
    null,
    { offRoom }
  )(OffRoom);
  