import crypto from "crypto";
import { Message } from "./Message";
import { Client } from "./Client";

interface iRoom {
  id: string;
  name: string;
  clients: Client[];
  messages: Message[];
  addClient: (client: Client) => void;
  removeClient: (client: Client) => void;
  addMessage: (message: Message) => void;
}
export class Room implements iRoom {
  id: string;
  name: string;
  clients: Client[];
  messages: Message[];

  constructor(name: string) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.clients = [];
    this.messages = [];
  }

  public addClient(client: Client) {
    this.clients.push(client);
    client.enterRoom(this);
  }

  public removeClient(client: Client) {
    this.clients = this.clients.filter((item) => item.id !== client.id);
  }

  public addMessage(message: Message) {
    this.messages.push(message);
  }
}
