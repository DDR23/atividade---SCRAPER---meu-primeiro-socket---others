import { Socket } from "socket.io";
import { Store } from "../models/ModelBot";

export default async function ControllerScraperFinish(socket: Socket, executionId: string) {
  const data = Store.data;
  try {
    if (data[executionId]?.isRunning) {
      data[executionId].isRunning = false;
      data[executionId].browser?.close();
      console.log(`Bot ${executionId} parado manualmente`);
    } else {
      console.log(`O bot ${executionId} já está parado.`);
    }
  } catch (error) {
    console.error(`Erro ao tentar parar o bot ${executionId}:`, error);
  }
}
