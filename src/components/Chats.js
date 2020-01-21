import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Comment, Avatar, Input} from 'antd';
import NewChat from './ChatsNew';


// // import { createRoom } from "../redux/actions";

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
    let { chats } = this.props.realtimeManager;
    let { username } = this.props.joinUser;
    const list = this.handleChat(chats);

    return (
      <div>
        <div>
          {list.map((element) => {
            return <span key={list.indexOf(element)}>{element}</span>;
          })}
        </div>
        <div>
          <NewChat 
           />
          {/* <Button onClick={this.newChat} type="primary">
            Submit
          </Button> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { realtimeManager: state.realtimeManager, joinUser: state.joinUser };
};
export default connect(mapStateToProps)(Chats);
