import React, { useEffect, useState } from "react";
import Board from "./Board";
import Cookies from "universal-cookie";
import {
  useChatContext,
  Channel,
  VirtualizedMessageList,
} from "stream-chat-react";
import Game from "./Game";
import "../Chat.css";
import CustomMessageInput from "./CustomMessageInput";

function JoinGame({ removeAllCookies, setIsAuth }) {
  const [startGame, setStartGame] = useState(false);
  const [user2, setUser2] = useState(false);
  const [channelName, setChannelName] = useState("");

  const cookies = new Cookies();

  const { client } = useChatContext();

  const [channel, setChannel] = useState(
    client.channel("messaging", cookies.get("channelName"))
  );

  const createChannel = async () => {
    try {
      const response = await client.queryUsers({
        name: { $eq: user2 },
      });

      if (response.users.length === 0) {
        alert("User not found");
        return;
      }

      const newChannel = await client.channel("messaging", {
        members: [client.userID, response.users[0].id],
      });
      cookies.set("channelName", channelName);
      await newChannel.watch();

      setChannel(newChannel);
      setStartGame(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {startGame ? (
        <Channel channel={channel} Input={CustomMessageInput}>
          <Game channel={channel} setStartGame={setStartGame} />
        </Channel>
      ) : (
        <>
          <div className="joinGame">
            <h4> Create A Game</h4>
            <input
              placeholder="Username of your rival..."
              onChange={(event) => {
                setUser2(event.target.value);
              }}
            />

            <button onClick={createChannel}>Start/Join Game</button>
          </div>

          <button
            onClick={() => {
              client.disconnectUser();
              removeAllCookies();
              setIsAuth(false);
            }}
          >
            Log Out
          </button>
        </>
      )}
    </div>
  );
}

export default JoinGame;
