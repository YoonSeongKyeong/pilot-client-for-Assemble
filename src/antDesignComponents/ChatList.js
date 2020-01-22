import React from 'react';
import ChatRow from "./ChatRow"

import 'antd/dist/antd.css';
import { Table } from 'antd';
import './ChatList.css';

const columns = [
  {
    title: 'Chats',
    dataIndex: 'content',
    width: 150,
  }
];

class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  render () {// chats를 갖고 ChatList를 생성한다.
    let {chats, name} = this.props
    let that = this

    if(chats) {
      let rows = chats.map((chat) => 
      ({content:<ChatRow chat={chat} key={chat.id} isSelfMsg={name===chat.author_name} /> , key:chat.id}))
      rows.push({content: <div className="bottomer" style={{ float:"left", clear: "both"}} ref={(el) => { that.messagesEnd = el; }}> </div>, key:-1})

      return (
      <div>
        <Table showHeader={false} pagination={false} columns={columns} dataSource={rows} scroll={{ y: 450 }} />
      </div>)
        
    }
    return null;
  }
}


export default ChatList;