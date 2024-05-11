const websocket = require("ws");
const wss = new websocket.Server({ port: 7070 });

// For storing connected clients
const clients = [];

// creating a webscoket server
wss.on("connection", function connection(ws) {
  //   push new clients in an Array
  clients.push(ws);

  //   Event Listenerr For Incoming Message
  ws.on("message", function Incoming(message) {
    if (message instanceof Buffer) {
      message = message.toString("utf-8");
    }
    // brodcast message to all client
    clients.forEach((client) => {
      if (client.readyState === websocket.OPEN) {
        client.send(message);
        console.log(message);
      }
    });
  });

  //   connection close event listener

  ws.on("close", function () {
    // removing client froom array
    clients.splice(clients.indexOf(ws), 1);
  });
});
