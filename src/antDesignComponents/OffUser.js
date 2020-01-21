import React from 'react'
import { connect } from "react-redux";
import { offUser } from "../redux/actions";

import { Button } from 'antd';
import 'antd/dist/antd.css';

const OffUser = ({offUser, history}) => {
    return (
        <div>
            <Button className="main-button" type="danger" shape="round" icon="left" onClick={()=>offUser(history)}>back</Button>
        </div>
    )
}

export default connect(
    null,
    { offUser }
  )(OffUser);
  