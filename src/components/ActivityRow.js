import React from "react";

const ActivityRow = ({info: {content, likes, dislikes}}) => (
  <li className="activity-row">
    <span>{content}</span>
    <span>likes: {likes}</span>
    <span>dislikes: {dislikes}</span>
  </li>
);

export default ActivityRow;
