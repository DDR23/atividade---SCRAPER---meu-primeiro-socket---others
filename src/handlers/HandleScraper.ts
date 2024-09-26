import { Server, Socket } from "socket.io";
import ControllerScraperInit from "../controllers/ControllerScraperInit";
import ControllerScraperFinish from "../controllers/ControllerScraperFinish";
import { TypeConfig } from "../types/TypeConfig";

const handleScraperInit = (socket: Socket, data: TypeConfig | TypeConfig[]) => {
  const configs = Array.isArray(data) ? data : [data];
  configs.forEach(config => {
    ControllerScraperInit(socket, config, config._id);
  });
};

const handleScraperFinish = (socket: Socket, executionId: string) => {
  ControllerScraperFinish(socket, executionId);
};

export default function HandleScraper(io: Server): void {
  io.on('connection', (socket: Socket) => {
    console.log('Novo cliente conectado');

    socket.on('SCRAPER_INIT', (data) => handleScraperInit(socket, data));
    socket.on('SCRAPER_FINISH', handleScraperFinish.bind(null, socket));

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
}
