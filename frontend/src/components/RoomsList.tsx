import { useState, useEffect } from "react";
import RoomElement from "./RoomElement";
import { useRoomStore } from "../store/room";
import { useWebsocket } from "../hooks/websocket";

interface iRoom {
  id: string;
  name: string;
  clients: any[];
}

export default function RoomsList() {
  const [websocket] = useWebsocket();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [list, setList] = useState<iRoom[]>([]);
  const { selected, enterRoom } = useRoomStore();

  async function fetchData() {
    try {
      setLoading(true);
      setError("");
      const result = await fetch("http://10.0.0.213:8080/rooms");
      const data = await result.json();
      setList(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <h1>Loading list...</h1>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h1>Error: {error}</h1>
      </>
    );
  }

  return (
    <ul className="rooms-list">
      {list.map((room) => (
        <RoomElement
          name={room.name}
          selected={room.id === selected}
          onClick={() => enterRoom(websocket, room.id)}
          key={room.id}
        />
      ))}
    </ul>
  );
}
