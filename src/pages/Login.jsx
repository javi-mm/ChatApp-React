import "./Login.css";
import googleLogo from "../assets/icons/google.png";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import {
  userExists,
  addDocWithDate,
  addDocWithoutDate,
} from "../helpers/functions";

const helperFunction = async (user) => {
  const { displayName, uid, email, photoURL } = user;
  const exists = await userExists(user);

  if (!exists) {
    addDocWithoutDate("userChats", user.uid, {
      chats: [],
    });
  }
  addDocWithDate("users", user.uid, {
    displayName,
    photoURL,
    email,
    uid,
  });
};

const Login = () => {
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        helperFunction(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="wrapper">
      <div className="login">
        <h1>Chat App</h1>
        <h2>Inicia Sesión</h2>
        <button onClick={handleLogin} className="login_button">
          <img src={googleLogo} alt="Logo de Google" />
          <p className="button_text">Google</p>
        </button>
      </div>
    </div>
  );
};

export default Login;
