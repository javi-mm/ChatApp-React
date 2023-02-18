import "./User.css";
import { useContext } from "react";
import { AuthContext } from "../context/usercontext";
import { ChatContext } from "../context/chatcontext";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
const User = () => {
  const [chat, setChat] = useContext(ChatContext);
  const { photoURL, displayName, uid } = useContext(AuthContext);

  if (!photoURL || !displayName) return;

  return (
    <div className="currentuser">
      <div className="currentuser_left">
        <div className="currentuser_left_imagename">
          <img src={`${photoURL}`} alt="Imagen del usuairo" />
          <p className="currentuser_left_username">
            {displayName.split(" ")[0]}
          </p>
        </div>
        <button
          onClick={async () => {
            const userRef = doc(db, "users", uid);
            await updateDoc(userRef, {
              online: false,
            });
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
