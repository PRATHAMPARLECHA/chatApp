import more from "../image/126574_more_icon.png";
import add from "../image/add_user_profile_person_avatar_icon_196535.png";

import Messages from "./Messages.jsx";
import Input from "./Input.jsx";
import { useContext } from "react";
import { UserContext } from "../store/userContext.jsx";

export default function Chats() {
  const { data } = useContext(UserContext);
  return (
    <div className="chats">
      <div className="userInfo">
        <div className="userDetails">
          <img src={data.userInfo?.photoURL} alt="" />
          <span>{data.userInfo?.displayName}</span>
        </div>
        <div className="userIcon">
          <img src={add} alt="" />
          <img src={more} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}
