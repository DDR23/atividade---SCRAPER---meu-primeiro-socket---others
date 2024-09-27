import { Socket } from 'socket.io';
import { TypeConfig } from '../types/TypeConfig';
import { getStartAndFinishTimes, isWithinTime, msToSeconds } from '../utils/VerifyTime';
import { getShouldStop, setShouldStop } from './ControllerScraperFinish';
import { OpenBrowser, CloseBrowser } from '../utils/ConfigBrowser';
import { initBot } from '../bot/BotInit';

const SECOND = 1000;

export default async function ControllerScraperInit(socket: Socket, data: TypeConfig, executionId: string) {
  const { startTime, finishTime } = getStartAndFinishTimes(data.CONFIG_TIME_START, data.CONFIG_TIME_FINISH);
  setShouldStop(executionId, false);

  try {
    await waitForStartTime(startTime, finishTime, executionId);
    if (getShouldStop(executionId)) return;

    await OpenBrowser();
    emitInitSuccess(socket, executionId);
    console.log('Configurações:', data, `Execution ID: ${executionId}`);

    await initBot(socket, data, executionId);
  } catch (error) {
    handleError(error, socket, executionId);
  } finally {
    await CloseBrowser();
    emitFinishMessage(socket, executionId, getShouldStop(executionId));
  }
}

async function waitForStartTime(startTime: Date, finishTime: Date, executionId: string) {
  while (!isWithinTime(startTime, finishTime) && !getShouldStop(executionId)) {
    const timeUntilStart = startTime.getTime() - Date.now();
    console.log(`Fora do horário configurado. Aguardando ${msToSeconds(timeUntilStart)} segundos até a inicialização do bot ${executionId}`);
    await new Promise(resolve => setTimeout(resolve, SECOND));
  }
}

function emitInitSuccess(socket: Socket, executionId: string) {
  socket.emit('SCRAPER_INIT_RES_ON', {
    title: 'Sucesso',
    message: `Bot ${executionId} iniciado!`,
    executionId
  });
}

function emitFinishMessage(socket: Socket, executionId: string, stoppedByUser: boolean) {
  const title = stoppedByUser ? 'Aviso' : 'Sucesso';
  const message = stoppedByUser
    ? `Bot ${executionId} parado pelo usuário.`
    : `Bot ${executionId} encerrado pelo tempo limite!`;
  console.log(message);
  socket.emit('SCRAPER_INIT_RES_OFF', { title, message, executionId });
}

function handleError(error: unknown, socket: Socket, executionId: string) {
  console.error('Erro durante a execução do bot:', error);
  socket.emit('SCRAPER_INIT_RES', {
    title: 'Erro',
    message: `Erro no bot ${executionId}: ${error instanceof Error ? error.message : 'Ocorreu um erro durante a execução do bot.'}`,
    executionId
  });
}