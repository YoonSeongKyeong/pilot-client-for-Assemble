import React from "react";

const ScheduleRow = ({info: {content, likes, myLike}, onDeleteSelection ,onLikeSelection}) => (
  <li className="schedule-row">
    <span>{content}</span>
    <span onClick={myLike?()=>onDeleteSelection(content):()=>onLikeSelection(content, true)}>likes: {likes}{myLike&&"V"}</span>
  </li>
);

export default ScheduleRow;
