import { Store } from "../models/ModelBot";
import { getStartAndFinishTimes, getTimeRemaining, getTimeUntilStart, isWithinTime, msToSeconds } from "../utils/VerifyTime";

export default async function BotInit() {
  const data = Store.data;
  if (!data.config) { throw new Error("Config not found"); }
  const { startTime, finishTime } = getStartAndFinishTimes(data.config.CONFIG_TIME_START, data.config.CONFIG_TIME_FINISH);

  try {
    while (!isWithinTime(startTime, finishTime)) {
      const timeUntilStart = getTimeUntilStart(startTime);
      const secondsUntilStart = msToSeconds(timeUntilStart);
      console.log(`Bot ${data.executionId} fora do horário configurado. Aguardando ${secondsUntilStart} segundos até a inicialização...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    data.isRunning = true;
    console.log(`Bot ${data.executionId} iniciando...`);

    while (Date.now() <= finishTime.getTime()) {
      const timeRemaining = getTimeRemaining(finishTime);
      const secondsRemaining = msToSeconds(timeRemaining);
      console.log(`Bot ${data.executionId} está rodando. Tempo restante: ${secondsRemaining} segundos.`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    data.isRunning = false;
  } catch (error) {
    console.log(error);
  }
}
