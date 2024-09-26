import { Socket } from 'socket.io';
import { TypeConfig } from '../types/TypeConfig';
import { getStartAndFinishTimes, isWithinTime, msToSeconds } from '../utils/VerifyTime';
import { getShouldStop, setShouldStop } from './ControllerScraperFinish';

const SECOND = 1000;

export default async function ControllerScraperInit(socket: Socket, data: TypeConfig, executionId: string) {
  const { startTime, finishTime } = getStartAndFinishTimes(data.CONFIG_TIME_START, data.CONFIG_TIME_FINISH);
  setShouldStop(executionId, false);

  // Loop para verificar o tempo até o início
  await waitForStartTime(startTime, finishTime, executionId);
  if (getShouldStop(executionId)) return;

  try {
    emitInitSuccess(socket, executionId);
    console.log('Configurações:', data, `Execution ID: ${executionId}`);

    // Lógica principal do bot
    await runBotUntilFinishOrStop(finishTime, executionId, socket);
  } catch (error) {
    handleError(error, socket, executionId);
  }
}

async function waitForStartTime(startTime: Date, finishTime: Date, executionId: string) {
  while (!isWithinTime(startTime, finishTime) && !getShouldStop(executionId)) {
    const timeUntilStart = startTime.getTime() - Date.now();
    console.log(`Fora do horário configurado. Aguardando ${msToSeconds(timeUntilStart)} segundos até a inicialização do bot ${executionId}`);
    await new Promise(resolve => setTimeout(resolve, SECOND));
  }
}

async function runBotUntilFinishOrStop(finishTime: Date, executionId: string, socket: Socket) {
  while (Date.now() < finishTime.getTime() && !getShouldStop(executionId)) {
    // Aqui você deve adicionar a lógica principal do seu bot
    // Por exemplo: await runBotLogic(data);

    const timeRemaining = finishTime.getTime() - Date.now();
    console.log(`Bot está rodando. Tempo restante: ${msToSeconds(timeRemaining)} segundos.`);
    await new Promise(resolve => setTimeout(resolve, SECOND));
  }

  emitFinishMessage(socket, executionId, getShouldStop(executionId));
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