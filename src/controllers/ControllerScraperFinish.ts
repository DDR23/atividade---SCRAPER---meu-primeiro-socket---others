import { Socket } from "socket.io";
import { Store } from "../models/ModelBot";

export default async function ControllerScraperFinish(socket: Socket, executionId: string) {
  const data = Store.data;
  try {
    if (data[executionId]?.isRunning) { // Verifica se o bot está em execução
      console.log(`Parando o bot ${executionId}`);
      data[executionId].isRunning = false; // Atualiza o estado para parar o bot
    } else {
      console.log(`O bot ${executionId} já está parado.`);
    }
  } catch (error) {
    console.error(`Erro ao tentar parar o bot ${executionId}:`, error);
  }
}
