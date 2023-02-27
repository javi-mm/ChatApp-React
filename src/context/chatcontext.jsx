import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [chat, setChat] = useState({
    id: "",
    otherUser: "",
    photoUrl: "",
  });

  const changeChat = (id, otherUser, photoUrl) => {
    setChat({
      id,
      otherUser,
      photoUrl,
    });
  };

  return (
    <ChatContext.Provider value={[chat, changeChat]}>
      {children}
    </ChatContext.Provider>
  );
};
