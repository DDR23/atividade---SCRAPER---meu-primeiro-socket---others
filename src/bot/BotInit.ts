import { Socket } from "socket.io";
import { Store } from "../models/ModelBot";
import { getStartAndFinishTimes, getTimeRemaining, getTimeUntilStart, isWithinTime, msToSeconds } from "../utils/VerifyTime";
import { TypeConfig } from "../types/TypeConfig";

export default async function BotInit(socket: Socket, config: TypeConfig) {
  
  // const { startTime, finishTime } = getStartAndFinishTimes(data.config.CONFIG_TIME_START, data.config.CONFIG_TIME_FINISH);

  try {
    // while (!isWithinTime(startTime, finishTime)) {
    //   if (!data.isRunning) {
    //     console.log('bot parado manualmente');
    //     break;
    //   }
    //   const timeUntilStart = getTimeUntilStart(startTime);
    //   const secondsUntilStart = msToSeconds(timeUntilStart);
    //   console.log(`Bot ${data.executionId} fora do horário configurado. Aguardando ${secondsUntilStart} segundos até a inicialização...`);
    //   await new Promise(resolve => setTimeout(resolve, 1000));
    // }

    // data.isRunning = true;
    // console.log(`Bot ${data.executionId} iniciando...`);

    // while (Date.now() <= finishTime.getTime()) {
    //   if (!data.isRunning) {
    //     console.log('bot parado automaticamente');
    //     break;
    //   }
    //   const timeRemaining = getTimeRemaining(finishTime);
    //   const secondsRemaining = msToSeconds(timeRemaining);
    //   console.log(`Bot ${data.executionId} está rodando. Tempo restante: ${secondsRemaining} segundos.`);
    //   await new Promise(resolve => setTimeout(resolve, 1000));
    // }
    // data.isRunning = false;
    console.log('bot encerrado');
  } catch (error) {
    console.log(error);
  }
}
