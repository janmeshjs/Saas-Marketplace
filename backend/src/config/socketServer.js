const socketIo = require('socket.io');

let io;

function initializeSocketServer(server) {
  io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Handle events here

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}

function getIo() {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
}

module.exports = { initializeSocketServer, getIo };
