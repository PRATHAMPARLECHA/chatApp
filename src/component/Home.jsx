import SideBar from "../Components/SideBar";
import Charts from "../Components/Chats";

export default function Home() {
  return (
    <div className="home">
      <div className="container">
        <SideBar />
        <Charts />
      </div>
    </div>
  );
}
