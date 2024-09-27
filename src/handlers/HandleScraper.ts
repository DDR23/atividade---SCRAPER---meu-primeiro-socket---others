import { Server, Socket } from "socket.io";
import { TypeConfig } from '../types/TypeConfig';
import { modelBot } from "../models/ModelBot";

const handleScraperInit = (socket: Socket, data: TypeConfig | TypeConfig[]) => {
  const configs = Array.isArray(data) ? data : [data];
  configs.forEach(config => {
    modelBot.startBot(socket, config, config._id);
  });
};

const handleScraperFinish = async (socket: Socket, executionId: string) => {
  await modelBot.stopBot(executionId);
  socket.emit('SCRAPER_FINISH_RES', {
    title: 'Sucesso',
    message: `Bot ${executionId} finalizado com sucesso!`,
    executionId: executionId
  });
};

const handleStopAllBots = async (socket: Socket) => {
  await modelBot.stopAllBots();
  socket.emit('ALL_BOTS_STOPPED', {
    title: 'Sucesso',
    message: 'Todos os bots foram finalizados.'
  });
};

export default function HandleScraper(io: Server): void {
  io.on('connection', (socket: Socket) => {
    console.log('Novo cliente conectado');

    socket.on('SCRAPER_INIT', (data) => handleScraperInit(socket, data));
    socket.on('SCRAPER_FINISH', (executionId) => handleScraperFinish(socket, executionId));
    socket.on('STOP_ALL_BOTS', () => handleStopAllBots(socket));

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
}
