import "./MainPage.css";
import Compress from "../components/Compress";
import Search from "../components/Search";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Input from "../components/Input";
import User from "../components/User";

const MainPage = () => {
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
};

export default MainPage;
