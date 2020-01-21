import React from "react";
import 'antd/dist/antd.css';
import { Icon, Badge } from 'antd';

const ActivityRow = ({info: {content, likes, dislikes, myLike, myDislike}, onDeleteSelection ,onLikeSelection}) => (
  <div className="item-container">
    <span>{content}</span>
    {myLike
    ? <span className="like-button" onClick={myLike?()=>onDeleteSelection(content):()=>onLikeSelection(content, true)}>
      <Badge count={likes} style={{ backgroundColor: '#52c41a' }}>
      <Icon type="like" theme="filled"/>
      </Badge></span>
    : <span className="like-button" onClick={myLike?()=>onDeleteSelection(content):()=>onLikeSelection(content, true)}>
      <Icon type="like" theme="filled"/>                {likes}</span>}
    {myDislike
    ? <span className="dislike-button" onClick={myDislike?()=>onDeleteSelection(content):()=>onLikeSelection(content, false)}>
      <Badge count={dislikes} style={{ backgroundColor: 'rgb(251, 205, 0)' }}>
      <Icon type="dislike" theme="filled"/>
      </Badge></span>
    : <span className="dislike-button" onClick={myDislike?()=>onDeleteSelection(content):()=>onLikeSelection(content, false)}>
    <Icon type="dislike" theme="filled"/> {dislikes}</span> }
  </div>
);

export default ActivityRow;
