import { useContext } from "react";
import "./User.css";
import { AuthContext } from "../context/usercontext";
import { ChatContext } from "../context/chatcontext";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const User = () => {
  const [chat, setChat] = useContext(ChatContext);
  const { photoURL, displayName } = useContext(AuthContext);

  if (!photoURL || !displayName) return;

  return (
    <div className="currentuser">
      <div className="currentuser_left">
        <div className="currentuser_left_imagename">
          <img src={`${photoURL}`} alt="Imagen del usuairo" />
          <p>{displayName.split(" ")[0]}</p>
        </div>
        <button
          onClick={() => {
            signOut(auth).catch((error) => {
              console.log(error);
            });
          }}
          className="currentuser_button"
        >
          Logout
        </button>
      </div>
      <div className="currentuser_right">{chat.otherUser}</div>
    </div>
  );
};
export default User;
