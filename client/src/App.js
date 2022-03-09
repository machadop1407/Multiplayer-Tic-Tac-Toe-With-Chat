import "./App.css";
import { useState } from "react";
import Board from "./components/Board";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Cookies from "universal-cookie";
import Game from "./components/JoinGame";
const api_key = "nv2zh5h8pmyh";

function App() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);

  const removeAllCookies = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
  };

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }
  return (
    <div className="App">
      <Chat client={client}>
        {isAuth ? (
          <Game removeAllCookies={removeAllCookies} setIsAuth={setIsAuth} />
        ) : (
          <>
            <SignUp setIsAuth={setIsAuth} />
            <Login setIsAuth={setIsAuth} />
          </>
        )}
      </Chat>
    </div>
  );
}

export default App;
