import React, { useContext, useState } from "react";
import { AuthContext } from "../context/usercontext";
import { uuidv4 } from "@firebase/util";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { ChatContext } from "../context/chatcontext";
import { db } from "../../firebase";
import "./Input.css";

const Input = () => {
  const currentUser = useContext(AuthContext);
  const [chat, changeChat] = useContext(ChatContext);
  const [message, setMessage] = useState("");

  const textHandler = (event) => {
    setMessage(event.target.value);
  };

  const handleKey = (event) => {
    event.code === "Enter" && sendMessage();
  };

  const sendMessage = async () => {
    const sendMessage = message;
    setMessage("");
    if (message.length < 1) return;
    const chatRef = doc(db, "chats", chat.id);
    try {
      await updateDoc(chatRef, {
        date: Timestamp.now(),
        messages: arrayUnion({
          id: uuidv4(),
          text: sendMessage,
          sender: currentUser.email,
          date: Timestamp.now(),
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="input_wrap">
      <div className="input_and_button">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          onChange={textHandler}
          onKeyDown={handleKey}
          value={message}
          className="input"
        />
        <button className="input_button" onClick={sendMessage}>
          <div className="input_button_image"></div>
        </button>
      </div>
    </div>
  );
};

export default Input;
