import { Socket } from "socket.io";
import { TypeConfig } from "../types/TypeConfig";
import modalStateManager from "../models/ModelStateManager";

export default function ControllerScraperFinish(socket: Socket, data: TypeConfig): void {
  const botId = data._id; // Usando o _id do bot para identificar o estado do bot

  // Define o estado isRunning para false para o bot específico
  modalStateManager.setState(botId, { isRunning: false });

  socket.emit('SCRAPER_FINISH_RES', {
    title: 'Sucesso',
    message: `Bot ${botId} parado com sucesso!`,
  });

  console.log(`O bot ${botId} foi interrompido pelo comando de parada.`);
}
