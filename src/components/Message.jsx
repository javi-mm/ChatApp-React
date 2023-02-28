import "./Message.css";
import React, { useContext } from "react";
import { AuthContext } from "../context/usercontext";
import { secondsToDate } from "../helpers/functions";
import { Timestamp } from "firebase/firestore";

const Message = (props) => {
  const currentUser = useContext(AuthContext);
  const messageTime = secondsToDate(props.date?.seconds);

  return (
    <div
      key={props.id}
      className={` ${
        props.sender == currentUser.email
          ? "message self_message"
          : " message other_message"
      }`}
    >
      <div
        className={` ${
          props.sender == currentUser.email
            ? "message_text self_message_text"
            : "message_text other_message_text"
        }`}
      >
        {props.text}
        <div
          className={` ${
            props.sender == currentUser.email
              ? "self_message_date"
              : "other_message_date"
          }`}
        >
          {messageTime}
        </div>
      </div>
    </div>
  );
};

export default Message;
