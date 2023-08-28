const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server);

// Simulate sending price updates
setInterval(() => {
  const prices = {
    BTC: Math.random() * 50000,
    ETH: Math.random() * 3000,
    // Add more cryptocurrencies and their prices here
  };
  
  io.emit('priceUpdate', prices);
}, 1000);

server.listen(4000, () => {
  console.log('WebSocket server is running on port 4000');
});