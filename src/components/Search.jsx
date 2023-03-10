import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { ChatContext } from "../context/chatcontext";
import { AuthContext } from "../context/usercontext";
import { emailValidator } from "../helpers/functions";
import "./Search.css";

const Search = (props) => {
  const chatList = props.chatList;
  const currentUser = useContext(AuthContext);
  const [chatId, changeChatId] = useContext(ChatContext);
  const [enteredEmail, setenteredEmail] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const searchUser = async (userEmail) => {
      if (userEmail === currentUser.email) return;
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", userEmail));
      try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setError(true);
          setenteredEmail("");
          setValidEmail("");
          return;
        }
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
          setenteredEmail("");
          setValidEmail("");
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (validEmail) {
      searchUser(enteredEmail);
    }
  }, [validEmail]);

  const handleChange = (event) => {
    setError(false);
    setUser(null);
    setenteredEmail(event.target.value);
  };

  const handleSearch = () => {
    if (emailValidator(enteredEmail)) {
      setValidEmail(enteredEmail);
    } else {
      setError(true);
    }
  };

  const handleSearchOnEnter = (event) => {
    event.code === "Enter" && handleSearch();
  };

  const handleButton = async () => {
    const chat = chatList.filter((chat) => chat.users.includes(user.email));
    if (chat[0]) {
      changeChatId(chat[0].id, user.displayName.split(" ")[0], user.photoURL);
    } else {
      const addNewChat = async () => {
        const newChatRef = doc(collection(db, "chats"));
        try {
          const response = await setDoc(newChatRef, {
            date: serverTimestamp(),
            id: newChatRef.id,
            messages: [],
            users: [currentUser.email, user.email],
          });
        } catch (error) {
          console.log(error);
        }
      };
      addNewChat().catch((error) => console.log(error));
    }
    setUser(null);
  };
  return (
    <>
      <div className="search_div">
        <input
          type="text"
          placeholder="Busca un usuario por email..."
          onChange={handleChange}
          onPaste={handleChange}
          value={enteredEmail}
          onKeyDown={handleSearchOnEnter}
          className="input_search"
        />
        <button className="search_button" onClick={handleSearch}>
          <div className="search_button_image"></div>
        </button>
      </div>
      {user && !error && (
        <div className="search_user" onClick={handleButton}>
          <img
            src={`${user.photoURL}`}
            alt="Foto de usuario"
            referrerPolicy="no-referrer"
          />
          <p>{user.displayName.split(" ")[0]}</p>
        </div>
      )}
      {error && (
        <div className="error_message">No se pudo encontrar al usuario</div>
      )}
    </>
  );
};

export default Search;
