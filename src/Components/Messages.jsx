import { useContext, useEffect, useState } from "react";
import Message from "./Message.jsx";
import { UserContext } from "../store/userContext.jsx";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(UserContext);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [data.chatId]);
  return (
    <div className="messages">
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
      {/* <Message /> */}
    </div>
  );
}
