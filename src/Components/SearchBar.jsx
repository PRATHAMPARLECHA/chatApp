import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function SearchBar() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
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
      setError(error);
    }
  }
  function handleKey(event) {
    event.code === "Enter" && handleSearch();
  }
  return (
    <div className="searchbar">
      <div className="serachform">
        <input
          type="text"
          placeholder="search the person"
          onKeyDown={handleKey}
          onChange={handleChange}
        />
      </div>
      {error && <span>Failed to find</span>}
      {user && (
        <div className="userChat">
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
