import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';

export default (req, res) => {
  if (req.method === 'GET') {
    const server = new Server((req, res) => {
      res.writeHead(200);
      res.end('WebSocket server is running');
    });

    const io = new SocketServer(server);

    setInterval(() => {
      const prices = {
        BTC: Math.random() * 50000,
        ETH: Math.random() * 3000,
      };

      io.emit('priceUpdate', prices);
    }, 1000);

    io.listen(4000, () => {
      console.log('WebSocket server is running on port 4000');
    });

    server.listen(4001, () => {
      console.log('API server is running on port 4001');
    });
  } else {
    res.status(405).end();
  }
};
