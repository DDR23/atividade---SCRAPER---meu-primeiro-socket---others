import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';

export default function SocketSetup(httpServer: HttpServer) {
  const io = new Server(httpServer, { cors: { origin: process.env.URL_BACKEND } });

  io.on('connection', (socket) => {
    console.log('Um usuário se conectou');
    
    // TODO - criar o arquivo start que deve receber o socket
    socket.on('disconnect', () => console.log('Usuário desconectado'));
  });
}
