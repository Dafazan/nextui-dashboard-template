// server.ts
import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log('Received:', message);
  });

  ws.send(JSON.stringify({ title: 'Hello!', body: 'Welcome to our service!' }));
});
