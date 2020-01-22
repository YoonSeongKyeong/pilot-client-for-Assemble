import React from "react";
import 'antd/dist/antd.css';
import { Avatar, Tag } from 'antd';

const ChatRow = ({chat: {author_name, content, created_at}, isSelfMsg}) => {
    let timeInfo = new Date(created_at)
    let hour = timeInfo.getHours()
    let minute = timeInfo.getMinutes()
    return(
        (isSelfMsg?
    (<div>
        <div className="self-chat-row-cover">
            <Tag className="self-time-tag">{` ${hour} : ${minute} `}</Tag>
            <span className="self-chat-row">{content}</span>
        </div>
    </div>)
    :
    (<div>
        <Avatar className="avatar" size="medium">{author_name}</Avatar>
        <div className="chat-row-cover">
            <span className="chat-row">{content}</span>
            <Tag className="time-tag">{` ${hour} : ${minute} `}</Tag>
        </div>
    </div>)
        )
);}

export default ChatRow;
