import "./Message.css";
import React, { useContext } from "react";
import { AuthContext } from "../context/usercontext";
import { Timestamp } from "firebase/firestore";

const Message = (props) => {
  const currentUser = useContext(AuthContext);

  if (!currentUser) return;
  return (
    <div
      key={props.id}
      className={` ${
        props.sender == currentUser.email ? "self_message" : "message"
      }`}
    >
      <div
        className={` ${
          props.sender == currentUser.email
            ? "self_message_text"
            : "message_text"
        }`}
      >
        {props.text}
      </div>
      {/* <div>{props.date ? props.date.nanoseconds : ""}</div> */}
    </div>
  );
};

export default Message;
