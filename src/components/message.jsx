import React from 'react';
import {emojify} from 'react-emojione';


const Message = (props) => {
  return (
    <div className="message-container">
      <i className="author">
        <span>{props.message.author}</span>
        <small>{props.message.created_at}</small>
      </i>
      <p>{emojify(props.message.content)}</p>
    </div>
  );
};

export default Message;
