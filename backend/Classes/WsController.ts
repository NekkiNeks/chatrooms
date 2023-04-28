import { Room } from "./Room";

export class WsController {
  rooms: Room[];

  constructor() {
    this.rooms = [];
  }

  public addRoom(room: Room) {
    this.rooms.push(room);
  }

  public getRoom(roomId: string) {
    return this.rooms.find((room) => room.id === roomId) || this.rooms[0];
  }
}
