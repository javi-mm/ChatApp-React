import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { ChatContext } from "../context/chatcontext";
import "./SideChat.css";

const SideChat = (props) => {
  const userEmail = props.userEmail;
  const newChatId = props.chatId;
  const [user, setUser] = useState(null);
  const [chat, changeChatIdFunction] = useContext(ChatContext);

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

  useEffect(() => {
    if (userEmail) {
      searchUser(userEmail);
    }
  }, [userEmail]);

  useEffect(() => {
    const unsubUserChange = onSnapshot(collection(db, "users"), (doc) => {
      doc.docChanges().forEach((change) => {
        if (change.type === "modified") {
          searchUser(userEmail);
        }
      });
    });

    return () => {
      unsubUserChange();
    };
  }, []);

  const handleClick = () => {
    if (chat.id === newChatId) return;
    changeChatIdFunction(newChatId, user.displayName.split(" ")[0]);
  };

  return (
    <div>
      {user && (
        <div onClick={handleClick} className="sidechat">
          <div className="userphoto">
            <img src={`${user.photoURL}`} alt="User photo" />
            <div
              className={`status ${user.online ? "online" : "offline"}`}
            ></div>
          </div>
          <p className="sidechat_username">{user.displayName.split(" ")[0]}</p>
        </div>
      )}
    </div>
  );
};

export default SideChat;
