import React from "react";

const MenuRow = ({info: {content, likes, dislikes, myLike, myDislike}, onDeleteSelection ,onLikeSelection}) => (
  <li className="menu-row">
    <span>{content}</span>
    <span onClick={myLike?()=>onDeleteSelection(content):()=>onLikeSelection(content, true)}>likes: {likes}{myLike&&"V"}</span>
    <span onClick={myDislike?()=>onDeleteSelection(content):()=>onLikeSelection(content, false)}>dislikes: {dislikes}{myDislike&&"V"}</span>
  </li>
);

export default MenuRow;
