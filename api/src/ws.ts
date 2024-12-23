import { Server, WebSocket } from "ws";

let sockets: WebSocket[] = [];

export function startWS() {
  const server = new Server({ port: Number(process.env.PORT) || 5000 });
  server.on("listening", () => {
    console.log("WS server running on port", server.options.port);
  });

  server.on("connection", (socket) => {
    socket.send(`Socket ${sockets.length + 1} connected!`);
    sockets.push(socket);

    socket.on("message", (message) => {
      sockets.forEach((s) => {
        if (s !== socket) {
          s.send("message received: " + message);
        }
      });
    });

    socket.on("close", () => {
      console.log("Client disconnected");
      sockets = sockets.filter((s) => s !== socket);
    });
  });
}
