import { Server } from 'http';
import socketIO from 'socket.io';

let io: socketIO.Server;

export const init = (server: Server) => {
  io = new socketIO.Server(server);
  return io;
};

export const getIo = () => {
  if (!io) {
    throw new Error("io not initialized");
  }
  return io;
};