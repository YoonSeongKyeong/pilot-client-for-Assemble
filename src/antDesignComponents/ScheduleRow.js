import React from "react";
import 'antd/dist/antd.css';
import { Icon, Badge } from 'antd';

const ScheduleRow = ({info: {content, likes, myLike}, onDeleteSelection ,onLikeSelection}) => (
  <div className="item-container">
    <span>{content}</span>
    {myLike
    ? <span className="like-button" onClick={myLike?()=>onDeleteSelection(content):()=>onLikeSelection(content, true)}>
      <Badge count={likes} style={{ backgroundColor: '#52c41a' }}>
      <Icon type="like" theme="filled"/>
      </Badge></span>
    : <span className="like-button" onClick={myLike?()=>onDeleteSelection(content):()=>onLikeSelection(content, true)}>
      <Icon type="like" theme="filled"/> {likes}</span>}
  </div>
);

export default ScheduleRow;