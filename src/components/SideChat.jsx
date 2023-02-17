import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { ChatContext } from "../context/chatcontext";
import "./SideChat.css";

const SideChat = (props) => {
  const userEmail = props.userEmail;
  const newChatId = props.chatId;
  const [user, setUser] = useState(null);
  const [chat, changeChatIdFunction] = useContext(ChatContext);

  useEffect(() => {
    const searchUser = async (userEmail) => {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", userEmail));
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      } catch (error) {
        setError(true);
      }
    };

    if (userEmail) {
      searchUser(userEmail);
    }
  }, [userEmail]);

  const handleClick = () => {
    if (chat.id === newChatId) return;
    changeChatIdFunction(newChatId, user.displayName.split(" ")[0]);
  };

  return (
    <div>
      {user && (
        <div onClick={handleClick} className="sidechat">
          <img src={`${user.photoURL}`} alt="User photo" />
          <p>{user.displayName.split(" ")[0]}</p>
        </div>
      )}
    </div>
  );
};

export default SideChat;
