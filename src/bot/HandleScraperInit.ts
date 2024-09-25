import { Socket } from 'socket.io';
import { TypeConfig } from '../types/TypeConfig';
import Main from './scraper/Main';

export default async function HandleScraperInit(socket: Socket, data: TypeConfig | TypeConfig[]): Promise<void> {
  try {
    const configs = Array.isArray(data) ? data : [data];
    Main(socket, configs);
  } catch (error) {
    socket.emit('SCRAPER_INIT_RES', {
      title: 'Erro',
      message: (error as Error).message || 'Falha ao iniciar os scrapers.',
    });
  }
}
