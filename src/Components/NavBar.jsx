import { signOut } from "firebase/auth"
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";


export default function NavBar() {
    const {currentUser} = useContext(AuthContext)
    return <div className="navbar">
        <span className="logo">Chats</span>
        <div className="user">
            <img src={currentUser ? currentUser.photoURL: null} alt="" />
            <span>{currentUser ? currentUser.displayName: null}</span>
            <button onClick={() => signOut(auth)}>logout</button>
        </div>
    </div>
}