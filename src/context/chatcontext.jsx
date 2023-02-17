import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [chat, setChat] = useState({
    id: "",
    otherUser: "",
  });

  const changeChat = (id, otherUser) => {
    setChat({
      id,
      otherUser,
    });
  };

  return (
    <ChatContext.Provider value={[chat, changeChat]}>
      {children}
    </ChatContext.Provider>
  );
};
