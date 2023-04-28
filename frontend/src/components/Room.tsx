import { useWebsocket } from "../hooks/websocket";
import { useState } from "react";
import { useRoomStore } from "../store/room";

export default function Room() {
  const [websocket] = useWebsocket();
  const [count, setCount] = useState(0);
  const { selected } = useRoomStore();

  websocket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    switch (data.type) {
      case "room-update-members": {
        setCount(data.payload);
      }
    }
  };

  return (
    <div className="room-container">
      <h1>Комната {selected}</h1>
      <h2>В комнате находится {count} человек</h2>
    </div>
  );
}
