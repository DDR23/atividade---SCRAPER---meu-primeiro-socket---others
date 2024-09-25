import { Server as HttpServer } from 'http';
import { start } from 'repl';
import { Server } from 'socket.io';
import HandleScraperInit from '../bot/HandleScraperInit';

export default function SocketSetup(httpServer: HttpServer) {
  const io = new Server(httpServer, { cors: { origin: process.env.URL_BACKEND } });

  io.on('connection', (socket) => {
    console.log('Um usuário se conectou');
    socket.on('SCRAPER_INIT', (data) => HandleScraperInit(socket, data))
    socket.on('disconnect', () => console.log('Usuário desconectado'));
  });
}
