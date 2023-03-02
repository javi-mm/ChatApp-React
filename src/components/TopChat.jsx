import "./TopChat.css";
import React, { useContext } from "react";
import { ChatContext } from "../context/chatcontext";
import useWindowDimensions from "../hooks/useWindowDimensions";

const TopChat = ({ isChatSelected }) => {
  const [currentChat, changeChatID] = useContext(ChatContext);
  const { height, width } = useWindowDimensions();
  const isMobileWidth = width <= "500";

  return (
    <div className="top_chat">
      {isMobileWidth && (
        <button className="top_chat_button" onClick={isChatSelected}>
          <div className="top_chat_button_image_arrow"></div>
        </button>
      )}
      <div className="top_chat_left">
        <img
          src={`${currentChat.photoUrl}`}
          alt="Foto del usuario"
          referrerPolicy="no-referrer"
        />
        <div>
          <p>{currentChat.otherUser}</p>
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
