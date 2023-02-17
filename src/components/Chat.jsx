import "./Chat.css";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../context/chatcontext";
import { getCollection } from "../helpers/functions";
import { db } from "../../firebase";
import Message from "./Message";

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

  return (
    <div
      ref={divRef}
      className={`${messages.length >= 1 ? "chat" : "chat_sin_mensajes"}`}
    >
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
      {messages.length == 0 && (
        <p className="mensaje">Elige o crea un chat para empezar</p>
      )}
    </div>
  );
};

export default Chat;
