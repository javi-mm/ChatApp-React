import "../App.css";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Input from "../components/Input";
import User from "../components/User";

const MainPage = () => {
  return (
    <div className="wrapper">
      <div className="">
        <User />
        <div className="card">
          <div className="leftSide">
            <div className="leftSide-bottom">
              <Sidebar />
            </div>
          </div>
          <div className="rightSide">
            <Chat />
            <Input />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
