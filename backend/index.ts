import express from "express";
import { WebSocketServer } from "ws";
import { WsController } from "./Classes/WsController";
import { Client } from "./Classes/Client";
import { Room } from "./Classes/Room";
import { Message } from "./Classes/Message";
import cors from "cors";
import { WsAction } from "./Classes/WsAction";

const wss = new WebSocketServer({ port: 8081 });
const wsController = new WsController();
const app = express();

app.use(cors());

const testRoom1 = new Room("test-room1");
const testRoom2 = new Room("test-room2");
const testRoom3 = new Room("test-room3");

wsController.addRoom(testRoom1);
wsController.addRoom(testRoom2);
wsController.addRoom(testRoom3);

wss.on("connection", (ws) => {
  console.log("connection!");
  const client = new Client(ws);

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data as string) as WsAction;

    switch (data.type) {
      // if user created new room
      case "create-room": {
        const room = new Room(data.payload);
        room.addClient(client);
        wsController.addRoom(room);
        break;
      }
      // if user enter the room
      case "room-join": {
        const room = wsController.getRoom(data.payload);
        room.addClient(client);
        const action = new WsAction("room-update-members", room.clients.length);
        room.clients.forEach((client) => client.send(action));
        break;
      }
      // if user leave room
      case "room-leave": {
        const room = wsController.getRoom(data.payload);
        room.removeClient(client);
        const action = new WsAction("room-update-members", room.clients.length);
        room.clients.forEach((client) => client.send(action));
        break;
      }
      // if new message
      case "send-message": {
        const room = wsController.getRoom(data.payload);
        const message = new Message(data.text!, client);
        room.addMessage(message);
        break;
      }
    }
  };

  ws.onclose = () => {
    if (!client.RoomId) return;
    const room = wsController.getRoom(client.RoomId);
    room.removeClient(client);
    room.clients.forEach((client) => {
      const action = new WsAction("room-update-members", room.clients.length);
      client.send(action);
    });
  };
});

wss.on("close", () => {
  console.log("user disconected");
});

app.get("/rooms", (req, res) => {
  res.send({ success: true, data: wsController.rooms, message: null });
});

app.listen(8080, "10.0.0.213", () => {
  console.log("app is listening on port 8080...");
});
