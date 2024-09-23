import { Socket } from "socket.io";
import modalStateManager from "../models/ModelStateManager";

export default function ControllerScraperFinish(socket: Socket, id: string): void {
  try {
    modalStateManager.setState(id, { isRunning: false });
    socket.emit('SCRAPER_FINISH_RES', {
      title: 'Sucesso',
      message: `Bot ${id} parado com sucesso!`,
    });
  } catch (error) {
    socket.emit('SCRAPER_FINISH_RES', {
      title: 'Erro',
      message: (error as Error).message || `A ação não pode ser finalizada para o bot ${id}.`,
    });
  }
}