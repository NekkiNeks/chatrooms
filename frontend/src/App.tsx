import { FormEvent, useState } from "react";
import "./App.css";

import { useMessagesStore } from "./store/messages";

import { useWebsocket } from "./hooks/websocket";
import RoomsList from "./components/RoomsList";
import Room from "./components/Room";
import { useRoomStore } from "./store/room";

function App() {
  const { messages, addMessage } = useMessagesStore();
  const [websocket, connected] = useWebsocket();
  const [input, setInput] = useState("");
  const { selected } = useRoomStore();

  function sendMessage(e: FormEvent) {
    e.preventDefault();

    const payload = {
      room: 1,
      text: input,
    };

    websocket.send(JSON.stringify(payload));
    addMessage(input);
    setInput("");
  }

  if (!connected) {
    return (
      <>
        <h1>loading...</h1>
      </>
    );
  }

  return (
    <>
      <h1>Chat app</h1>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />

        <button type="submit">send</button>
      </form>

      {messages.map((item) => (
        <p>{item}</p>
      ))}

      <RoomsList />

      {selected && <Room />}
    </>
  );
}

export default App;
