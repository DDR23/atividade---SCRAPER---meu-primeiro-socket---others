import { Socket } from "socket.io";
import modelStateManager from "../models/ModelStateManager";
import { CloseBrowser } from '../scraper/utils/SetupBrowser';

export default async function ControllerScraperFinish(socket: Socket, id: string): Promise<void> {
  try {
    modelStateManager.setState(id, { isRunning: false });
    await CloseBrowser();

    socket.emit('SCRAPER_FINISH_RES', {
      title: 'Sucesso',
      message: `O bot ${id} foi encerrado com sucesso.`,
    });
  } catch (error) {
    socket.emit('SCRAPER_FINISH_RES', {
      title: 'Erro',
      message: (error as Error).message || `A ação não pode ser finalizada para o bot ${id}.`,
    });
  }
}
