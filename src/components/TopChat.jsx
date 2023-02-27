import "./TopChat.css";
import React, { useContext } from "react";
import { ChatContext } from "../context/chatcontext";

const TopChat = () => {
  const [currentChat, changeChatID] = useContext(ChatContext);

  return (
    <div className="top_chat">
      <div className="top_chat_left">
        <img
          src={`${currentChat.photoUrl}`}
          alt="Foto del usuario"
          referrerPolicy="no-referrer"
        />
        <div>
          <p>{currentChat.otherUser}</p>
          <div className="top_chat_escribiendo">Está escribiendo...</div>
        </div>
      </div>
      <div className="top_chat_right">
        <button className="top_chat_button">
          <div className="top_chat_button_image_video"></div>
        </button>
        <button className="top_chat_button">
          <div className="top_chat_button_image_phone"></div>
        </button>
      </div>
    </div>
  );
};

export default TopChat;
