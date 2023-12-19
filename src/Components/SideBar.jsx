import Chat from "./Chat.jsx";
import NavBar from "./NavBar.jsx";
import SearchBar from "./SearchBar.jsx";

export default function SideBar() {
    return <div className="sidebar">
        <NavBar />
        <SearchBar />
        <Chat />
    </div>
}