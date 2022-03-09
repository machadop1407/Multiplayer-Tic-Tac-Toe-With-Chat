import React, { useState } from "react";
import { MessageList, MessageInput, Window } from "stream-chat-react";
import Board from "./Board";
function Game({ channel, setStartGame }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel?.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: "none", state: "none" });

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });

  if (!playersJoined) {
    return <div>Waiting for other player to join...</div>;
  }
  return (
    <div className="gameContainer">
      <Board channel={channel} result={result} setResult={setResult} />
      <Window>
        <MessageList
          hideDeletedMessages
          messageActions={["react"]}
          defaultItemHeight={100}
          disableDateSeparator
          closeReactionSelectorOnClick
        />
        <MessageInput noFiles />
      </Window>
      <button
        onClick={async () => {
          await channel.stopWatching();
          setStartGame(false);
        }}
      >
        Leave Game
      </button>
    </div>
  );
}

export default Game;
