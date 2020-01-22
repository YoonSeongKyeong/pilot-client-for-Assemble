import React from 'react';
import ChatRow from "../antDesignComponents/ChatRow"

import 'antd/dist/antd.css';
import { Table } from 'antd';

const ChatList = ({ chats, name}) => {// chats를 갖고 ChatList를 생성한다.
    if(chats) {
        let rows = chats.map((chat) => 
        ({content:<ChatRow chat={chat} key={chat.id} isSelfMsg={name===chat.author_name} />}))
        return (<Table showHeader={false} pagination={false} columns={columns} dataSource={rows} scroll={{ y: 450 }} />
        )
    }
    return null
}

export default ChatList;




const columns = [
  {
    title: 'Chats',
    dataIndex: 'content',
    width: 150,
  }
];
