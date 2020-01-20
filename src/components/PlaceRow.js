import React from "react";

const PlaceRow = ({info: {content, likes, myLike}, onDeleteSelection ,onLikeSelection}) => (
  <li className="place-row">
    <span>{content}</span>
    <span onClick={myLike?()=>onDeleteSelection(content):()=>onLikeSelection(content, true)}>likes: {likes}{myLike&&"V"}</span>
  </li>
);

export default PlaceRow;
