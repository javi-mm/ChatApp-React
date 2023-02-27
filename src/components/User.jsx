import "./User.css";
import { useContext } from "react";
import { AuthContext } from "../context/usercontext";
import { ChatContext } from "../context/chatcontext";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
const User = () => {
  const { photoURL, displayName, uid } = useContext(AuthContext);

  if (!photoURL || !displayName) return;

  return (
    <div className="currentuser">
      <div className="current_user_with_logout">
        <div className="currentuser_left">
          <img
            src={`${photoURL}`}
            alt="Imagen del usuairo"
            referrerPolicy="no-referrer"
          />
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
          <div className="currenuser_button_image"></div>
        </button>
      </div>
    </div>
  );
};
export default User;
