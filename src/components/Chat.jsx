import "./Chat.css";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../context/chatcontext";
import { getCollection } from "../helpers/functions";
import { db } from "../../firebase";
import Message from "./Message";
import TopChat from "./TopChat";
import Input from "./Input";
import Search from "./Search";

const Chat = () => {
  const divRef = useRef();
  const [chat, changeChat] = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

  const getChatMessages = async () => {
    const chatData = await getCollection("chats", chat.id);
    setMessages(chatData.messages);
  };

  useEffect(() => {
    if (!chat.id) return;
    const unsub = onSnapshot(doc(db, "chats", chat.id), (doc) => {
      getChatMessages();
    });

    return () => {
      unsub();
    };
  }, [chat.id]);

  useEffect(() => {
    const showBottomChat = () => {
      divRef.current.scrollTop =
        divRef.current.scrollHeight - divRef.current.clientHeight;
    };
    if (divRef.current) {
      showBottomChat();
    }
  }, [messages]);

  if (!chat.id) {
    console.log(chat);
    return (
      <>
        <div className="chat_sin_id_wrapper">
          <div className="chat_sin_id">
            <h1>Te damos la bienvenida a</h1>
            <img
              src="/logo.svg"
              alt="Logo del chat"
              className="chat_sin_id_logo_img"
            />
            <div className="chat_sin_id_text">
              <p>Empieza una conversación con quien tú quieras.</p>
              <p>Tan solo busca el usuario mediante email.</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <TopChat />
      <div ref={divRef} className="chat">
        {messages.length >= 1 &&
          messages.map((message) => {
            return (
              <Message
                key={message.id}
                id={message.id}
                text={message.text}
                sender={message.sender}
                date={message.date}
              ></Message>
            );
          })}
      </div>
      <Input />
    </>
  );
};

export default Chat;
