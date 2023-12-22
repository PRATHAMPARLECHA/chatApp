import { useContext, useState } from "react";
import { collection, query, where, getDocs, getDoc, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../store/AuthContext";

export default function SearchBar() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const {currentUser} = useContext(AuthContext);
  function handleChange(event) {
    setUserName(event.target.value);
  }
  async function handleSearch() {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setError(true);
    }
  }
  function handleKey(event) {
    event.code === "Enter" && handleSearch();
  }
  async function handleClickUser() {
    const combinedId = currentUser.uid > user.uid ? (currentUser.uid + user.uid) : (user.uid + currentUser.uid)
    try{
      const res = await getDoc(doc(db, "chats", combinedId))
      if(!res.exists()){
        await setDoc(doc(db, "chats", combinedId), {
          messages: []
        })
        await updateDoc(doc(db, "userChats", currentUser.uid),{
          [combinedId+".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId+".date"]: serverTimestamp()
        })
        await updateDoc(doc(db,"userChats", user.uid),{
          [combinedId+".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId+".date"]: serverTimestamp()
        })
      }
    }catch(error){
      setError(true);
    }
    setUser(null);
    setUserName("");
  }
  return (
    <div className="searchbar">
      <div className="serachform">
        <input
          type="text"
          value={userName}
          placeholder="search"
          onKeyDown={handleKey}
          onChange={handleChange}
        />
      </div>
      {error && <span>Failed to find</span>}
      {user && (
        <div className="userChat" onClick={handleClickUser}>
          <img
            src={user.photoURL}
            alt=""
          />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}
