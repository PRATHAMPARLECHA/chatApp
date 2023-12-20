import { useContext, useState } from "react";
import folder from "../image/file-solid-24.png";
import send from "../image/send-regular-24.png";
import { AuthContext } from "../store/AuthContext";
import { UserContext } from "../store/userContext";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(UserContext);

  function handleTextChange(event) {
    setText(event.target.value);
  }
  function handleImgChange(event) {
    setImg(event.target.files[0]);
  }

  async function handleSendChats() {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          time: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db,"userChats", currentUser.uid), {
      [data.chatId+".lastMessage"]: {
        text,
      },
      [data.chatId+'.date']: serverTimestamp()
    })
    await updateDoc(doc(db,"userChats", data.userInfo.uid), {
      [data.chatId+".lastMessage"]: {
        text,
      },
      [data.chatId+'.date']: serverTimestamp()
    })
    setText("");
    setImg(null);
  }

  return (
    <div className="input">
      <input type="text" onChange={handleTextChange} value={text} />
      <div className="textSender">
        <input
          type="file"
          name="file"
          id="file"
          style={{ display: "none" }}
          onChange={handleImgChange}
        />
        <label htmlFor="file">
          <img src={folder} alt="" />
        </label>
        <button onClick={handleSendChats}>
          <img src={send} alt="" />
        </button>
      </div>
    </div>
  );
}
