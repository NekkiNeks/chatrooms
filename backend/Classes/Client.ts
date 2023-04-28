import crypto from "node:crypto";
import { WsAction } from "./WsAction";
import { Room } from "./Room";

interface iClient {
  id: string;
  send: (action: WsAction) => void;
}

export class Client implements iClient {
  id: string;
  RoomId: string | null = null;
  private socket: any;

  constructor(ws: any) {
    this.id = crypto.randomUUID();
    this.socket = ws;
  }

  public send(action: WsAction) {
    this.socket.send(JSON.stringify(action));
  }

  public enterRoom(room: Room) {
    this.RoomId = room.id;
  }
}
