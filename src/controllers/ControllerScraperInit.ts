import { Socket } from "socket.io";
import { TypeConfig } from "../types/TypeConfig";
import { Store } from "../models/ModelBot";
import { getStartAndFinishTimes, getTimeRemaining, getTimeUntilStart, isWithinTime, msToSeconds } from "../utils/VerifyTime";

export default async function ControllerScraperInit(socket: Socket, data: TypeConfig | TypeConfig[]) {
  const configs = Array.isArray(data) ? data : [data];
  
  for (const config of configs) {
    const store = new Store({
      executionId: config._id,
      data: {
        config: config,
        isRunning: false,
      }
    });

    try {
      const data = Store.data;
      const timeStart = data[config._id]?.config?.CONFIG_TIME_START || '00:00';
      const timeFinish = data[config._id]?.config?.CONFIG_TIME_FINISH || '00:00';
      const { startTime, finishTime } = getStartAndFinishTimes(timeStart, timeFinish);

      console.log(timeStart)

      // TODO - verificar por que nao esta entrando no while
      while (!isWithinTime(startTime, finishTime)) {
        if (!data[config._id]?.isRunning) {
          console.log(`Bot ${config._id} parado antes de começar...`);
          break;
        }
        const timeUntilStart = getTimeUntilStart(startTime);
        const secondsUntilStart = msToSeconds(timeUntilStart);
        console.log(`Bot ${config._id} fora do horário configurado. Aguardando ${secondsUntilStart} segundos até a inicialização...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      data[config._id].isRunning = true;
      console.log(`Bot ${config._id} iniciado...`);

      while (Date.now() <= finishTime.getTime()) {
        if (!data[config._id]?.isRunning) {
          console.log(`Bot ${config._id} parado automaticamente.`);
          break;
        }
        const timeRemaining = getTimeRemaining(finishTime);
        const secondsRemaining = msToSeconds(timeRemaining);
        console.log(`Bot ${config._id} está rodando. Tempo restante: ${secondsRemaining} segundos.`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      data[config._id].isRunning = false;
      console.log(`Bot ${config._id} encerrado...`);
      
    } catch (error) {
      console.error(`Erro ao iniciar o bot ${config._id}:`, error);
      store.update(config._id, { isRunning: false });
    }
  }
}
