import { Client } from "./Client";

interface iMessage {
  text: string;
  author: Client;
}

export class Message implements iMessage {
  constructor(public text: string, public author: Client) {}
}
