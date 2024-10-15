import { Socket } from "socket.io";
import { TypeConfig } from "../types/TypeConfig";
import { Store } from "../models/ModelBot";
import { getStartAndFinishTimes, getTimeRemaining, getTimeUntilStart, isWithinTime, msToSeconds } from "../utils/VerifyTime";
import { configBrowser } from "../utils/ConfigBrowser";
import { MakeLogin } from "../utils/MakeLogin";
import BotInit from "../bot/BotInit";

export default async function ControllerScraperInit(socket: Socket, data: TypeConfig | TypeConfig[]) {
  const configs = Array.isArray(data) ? data : [data];

  for (const config of configs) {
    const store = new Store({
      executionId: config._id,
      data: {
        config: config,
        isRunning: false,
        browser: null,
      }
    });

    try {
      const data = Store.data;
      data[config._id].isRunning = true;
      const timeStart = data[config._id]?.config?.CONFIG_TIME_START || '00:00';
      const timeFinish = data[config._id]?.config?.CONFIG_TIME_FINISH || '00:00';
      const { startTime, finishTime } = getStartAndFinishTimes(timeStart, timeFinish);

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

      const browser = await configBrowser();
      store.update(config._id, { browser: browser });
      const { page, myBet } = await MakeLogin(config._id);
      store.update(config._id, { page: page, myBet: myBet });

      // await BotInit();
      console.log(`Bot ${config._id}:`, Store.data[config._id]);

      while (Date.now() <= finishTime.getTime()) {
        if (!data[config._id]?.isRunning) {
          break;
        }
        const timeRemaining = getTimeRemaining(finishTime);
        const secondsRemaining = msToSeconds(timeRemaining);
        console.log(`Bot ${config._id} está rodando. Tempo restante: ${secondsRemaining} segundos.`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      if (data[config._id]?.isRunning) {
        data[config._id].isRunning = false;
        data[config._id].browser?.close();
        console.log(`Bot ${config._id} encerrado...`);
      }

    } catch (error) {
      console.error(`Erro ao iniciar o bot ${config._id}:`, error);
      store.update(config._id, { isRunning: false });
    }
  }
}
