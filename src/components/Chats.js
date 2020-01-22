import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './Chats.css'
import { Comment, Avatar, Input, Icon } from 'antd';
import NewChat from './ChatsNew';
import ChatList from '../components/ChatList';


class Chats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: '',
      chatmessage: '',
    };
  }

  // newChat = (e) => {
  //   console.log("hi")
  //   postChat(this.state.chatmessage);
  // };

  // updateChat = (obj) => {
  //   this.setState({
  //     chats: obj,
  //   });
  // };

  
  handleNewChat = (data) => {
    this.setState({
      chats: data
    })
  }

  handleChat = (obj) => {
    let result = [];
    for (let element in obj) {
      if (Object.keys(obj[element].created_at).length === 0){
        obj[element].created_at = Date.now()
      }
      
      result.push(
        <Comment
          author={<div>{obj[element].author_name}</div>}
          avatar={
            <Avatar
              src="https://www.iconninja.com/files/720/593/187/messenger-online-msn-icon.png"
              alt="Icon"
            />
          }
          content={<p>{obj[element].content}</p>}
          datetime={<span>{obj[element].created_at}</span>}
        />,
      );
    }
    return result;
  };

  render() {
    let { chats, myself } = this.props.realtimeManager;
    let { name } = myself;

    return (
      <div>
        <div style={{ textAlign: 'center', color: 'black', margin: '20px 30px 25px 30px', 'backgroundColor': 'white'}} fontSize='3rem'><Icon size="" type="message"/> CHATTING</div>
        <div style={{ padding: '0 30px 30px 30px '}}>
          <ChatList chats={chats} name={name}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { realtimeManager: state.realtimeManager };
};
export default connect(mapStateToProps)(Chats);
