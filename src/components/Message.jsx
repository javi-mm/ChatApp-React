import "./Message.css";
import React, { useContext } from "react";
import { AuthContext } from "../context/usercontext";
import { secondsToDate } from "../helpers/functions";
import { Timestamp } from "firebase/firestore";

const Message = (props) => {
  const currentUser = useContext(AuthContext);
  const messageTime = secondsToDate(props.date?.seconds);
  const messageTimeSeconds =
    messageTime.getMinutes().toString().length == 1
      ? "0" + messageTime.getMinutes()
      : messageTime.getMinutes();
  const finalMessageTime = messageTime.getHours() + ":" + messageTimeSeconds;
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
        {/* <div className="message_date">{props.date ? finalMessageTime : ""}</div> */}
      </div>
    </div>
  );
};

export default Message;
