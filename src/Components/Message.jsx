import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { UserContext } from "../store/userContext";

export default function Message({message}) {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(UserContext);
  return (
    <div className={`message ${message.senderId === (currentUser && currentUser.uid) && 'owner'}`}>
      <div className="messageInfo">
        <img
          src={message.senderId === (currentUser && currentUser.uid) ? currentUser.photoURL : data.userInfo.photoURL}
          alt=""
        />
        <span>sent now</span>
      </div>
      <div className="messageContent">
        {message.text.trim().length > 0 && <p>{message.text}</p>}
        {message.img && <img
          src={message.img}
          alt=""
        />}
      </div>
    </div>
  );
}
