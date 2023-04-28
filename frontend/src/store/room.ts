import { create } from "zustand";
import { WsAction } from "../Classes/WsAaction";

interface roomState {
  selected: string;
  enterRoom: (websocket: WebSocket, roomId: string) => void;
}

export const useRoomStore = create<roomState>()((set) => ({
  selected: "",

  // actions
  enterRoom: (websocket: WebSocket, roomId: string) =>
    set((state) => {
      if (state.selected === roomId) return {};

      if (state.selected) {
        const action = new WsAction("room-leave", state.selected);
        websocket.send(JSON.stringify(action));
      }

      const action = new WsAction("room-join", roomId);
      websocket.send(JSON.stringify(action));

      return { selected: roomId };
    }),
}));
