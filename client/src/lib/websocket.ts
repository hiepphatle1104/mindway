import { WebSocketServer } from "ws";

const wsClient = new WebSocketServer({ port: 8080 });

wsClient.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.send("something");
});
