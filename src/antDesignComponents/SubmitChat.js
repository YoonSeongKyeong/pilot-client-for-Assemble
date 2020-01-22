import React from 'react'
import { connect } from "react-redux";
import { postChat } from '../redux/actions';

import { Input } from 'antd';
import 'antd/dist/antd.css';

const { Search } = Input;

class SubmitChat extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        chatInputValue: "",
      };
    }

    onInputChange = (e) => this.setState({chatInputValue: e.target.value})

    onPostChat = () => {
        let {postChat} = this.props
        let {chatInputValue} = this.state 
        postChat({content:chatInputValue})
        this.setState({chatInputValue:''})
    }
    
    render() {
        let {onPostChat, onInputChange} = this
    let {chatInputValue} = this.state 
    return (
        <div style={{marginTop:'1em'}}>
            <Search placeholder="message" enterButton="SEND" size="large" value={chatInputValue} onChange={onInputChange} onSearch={() => onPostChat()} allowClear={true} />
        </div>
    )
    }
}

export default connect(
    null,
    { postChat }
  )(SubmitChat);