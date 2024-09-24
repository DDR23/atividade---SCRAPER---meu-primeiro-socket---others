import { Socket } from 'socket.io';
import { TypeConfig } from '../types/TypeConfig';
import { getStartAndFinishTimes, getTimeUntilStart, getTimeRemaining, msToSeconds, isWithinTime } from '../scraper/utils/VerifyTime';
import modalStateManager from '../models/ModelStateManager';
import { OpenBrowser } from '../scraper/utils/SetupBrowser';
import { Scraper } from '../models/ModelScraper';
import { StartScraper } from '../scraper/StartScraper';

export default async function ControllerScraperInit(socket: Socket, data: TypeConfig): Promise<void> {
  const botId = data._id;
  let scraper: Scraper | null = null;
  modalStateManager.setState(botId, { isRunning: true });
  const { startTime, finishTime } = getStartAndFinishTimes(data.CONFIG_TIME_START, data.CONFIG_TIME_FINISH);

  try {
    while (!isWithinTime(startTime, finishTime)) {
      if (!modalStateManager.getState(botId).isRunning) return;
      const secondsUntilStart = msToSeconds(getTimeUntilStart(startTime));
      console.log(`Bot ${botId} fora do horário configurado. Aguardando ${secondsUntilStart} segundos até a inicialização...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    socket.emit('SCRAPER_INIT_RES_ON', {
      title: 'Sucesso',
      message: `Bot ${botId} iniciado!`
    });

    while (Date.now() <= finishTime.getTime()) {
      const currentState = modalStateManager.getState(botId);
      if (!currentState.isRunning) {
        await scraper?.stop();
        break;
      }

      if (!scraper) {
        await OpenBrowser();
        const page = await StartScraper(data);
        scraper = new Scraper(page, data._id, 1000);
        await scraper.start();
      }

      const timeRemaining = getTimeRemaining(finishTime);
      const secondsRemaining = msToSeconds(timeRemaining);
      console.log(`Bot ${botId} está rodando. Tempo restante: ${secondsRemaining} segundos.`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (scraper) {
      await scraper.stop();
    }

    socket.emit('SCRAPER_INIT_RES_OFF', {
      title: 'Sucesso',
      message: `Bot ${botId} encerrado!`
    });
  } catch (error) {
    socket.emit('SCRAPER_INIT_RES', {
      title: 'Erro',
      message: (error as Error).message || `A ação não pode ser finalizada para o bot ${botId}.`,
    });
  }
}
