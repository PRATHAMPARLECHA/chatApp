import more from "../image/126574_more_icon.png";
import add from "../image/add_user_profile_person_avatar_icon_196535.png";

import Messages from "./Messages.jsx";
import Input from "./Input.jsx";

export default function Chats() {
  return (
    <div className="chats">
      <div className="userInfo">
        <div className="userDetails">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-mMLFPPPzi23Jjj5wpQHVALh3VCqMODz69SZAdM2t0SoyqHo-hhxfGCpMKg&s"
            alt=""
          />
          <span>Naman</span>
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
