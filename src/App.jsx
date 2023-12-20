import "./styles.scss";
import Login from "./component/Login.jsx";
import Register from "./component/Register.jsx";
import Home from "./component/Home.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./store/AuthContext.jsx";
import { UserContext } from "./store/userContext.jsx";

function App() {
  const [didPage, setIsPage] = useState("register");

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      setIsPage("login");
    }
  }, [currentUser]);
  function HandleLogin() {
    setIsPage("login");
  }
  function handleRegister() {
    setIsPage("register");
  }
  function handleHome() {
    setIsPage("home");
  }
  return (
    <>
      {didPage === "register" && (
        <Register onLogin={HandleLogin} onHome={handleHome} />
      )}
      {didPage === "login" && (
        <Login onRegister={handleRegister} onHome={handleHome} />
      )}
      {didPage === "home" && <Home onLogout={HandleLogin} />}
    </>
  );
}

export default App;
