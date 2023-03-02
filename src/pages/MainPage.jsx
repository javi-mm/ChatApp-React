import "./MainPage.css";
import Compress from "../components/Compress";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import User from "../components/User";
import { useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

const MainPage = () => {
  const [chatSelected, setChatSelected] = useState(false);
  const { height, width } = useWindowDimensions();
  const isMobileWidth = width <= "500";

  const isChatSelected = () => {
    setChatSelected(!chatSelected);
  };

  if (!isMobileWidth) {
    return (
      <div className="wrapper">
        <div className="chat_window">
          <div className="chat_left_side">
            <Compress />
            <Sidebar />
            <User />
          </div>
          <div className="chat_right_side">
            <Chat />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="chat_window">
        <div
          className={`${
            !chatSelected && isMobileWidth ? "chat_left_side" : "no_display"
          }`}
        >
          <Compress />
          <Sidebar isChatSelected={isChatSelected} />
          <User />
        </div>
        <div
          className={`${
            chatSelected && isMobileWidth ? "chat_right_side" : "no_display"
          }`}
        >
          <Chat isChatSelected={isChatSelected} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
