import Search from "./Search";
import SideChat from "./SideChat";
import "./Sidebar.css";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../context/usercontext";
import { getCollection } from "../helpers/functions";

const Sidebar = (props) => {
  const { email } = useContext(AuthContext);
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const helperFn = async (email) => {
      const userChatsRef = collection(db, "chats");
      const q = query(userChatsRef, where("users", "array-contains", email));
      try {
        const querySnapshot = await getDocs(q);
        setChatList([]);
        querySnapshot.forEach((doc) => {
          setChatList((prevState) => [...prevState, doc.data()]);
        });
      } catch (error) {
        setError(true);
      }
    };

    if (!email) {
      return;
    }
    helperFn(email);

    const unsub = onSnapshot(collection(db, "chats"), (doc) => {
      doc.docChanges().forEach((change) => {
        if (change.type === "modified") {
          (async () => {
            const response = await getCollection("chats", change.doc.ref.id);
            if (response.users.includes(email)) {
              helperFn(email);
            } else {
              return;
            }
          })();
        }
        // console.log("Modified chat: ", change.doc.data());
        // console.log("Modified chat: ", change.doc.ref.id);
      });
    });

    return () => {
      setChatList([]);
      unsub();
    };
  }, [email]);

  if (!chatList || !email) {
    return;
  }

  chatList.sort((a, b) => b.date - a.date);

  return (
    <div className="sidebar_wrapper">
      <Search chatList={chatList} />
      <div>
        {chatList.length >= 1 && (
          <>
            {chatList.map((chat) => {
              const userEmail = chat.users.find((user) => {
                return user !== email;
              });
              return (
                <SideChat
                  key={chat.id}
                  userEmail={userEmail}
                  chatId={chat.id}
                ></SideChat>
              );
            })}
          </>
        )}
        {}
      </div>
    </div>
  );
};

export default Sidebar;
