import { useEffect, useState } from "react";

const websocket = new WebSocket("ws://10.0.0.213:8081");

export function useWebsocket(): [WebSocket, boolean] {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    websocket.onopen = () => {
      setConnected(true);
    };

    websocket.onclose = () => {
      setConnected(false);
    };
  }, []);

  return [websocket, connected];
}
