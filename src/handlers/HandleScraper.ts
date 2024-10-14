import { Server, Socket } from "socket.io";
import ControllerScraperInit from "../controllers/ControllerScraperInit";
import ControllerScraperFinish from "../controllers/ControllerScraperFinish";

export default function HandleScraper(io: Server): void {
  io.on('connection', (socket: Socket) => {
    console.log('Novo cliente conectado');

    socket.on('SCRAPER_INIT', (data) => ControllerScraperInit(socket, data));
    socket.on('SCRAPER_FINISH', (executionId) => ControllerScraperFinish(socket, executionId));
    // socket.on('STOP_ALL_BOTS', () => handleStopAllBots(socket));

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
}
