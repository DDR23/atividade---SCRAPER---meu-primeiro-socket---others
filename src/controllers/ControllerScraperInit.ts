import { Socket } from 'socket.io';
import { TypeConfig } from '../types/TypeConfig';
import { getStartAndFinishTimes, getTimeUntilStart, getTimeRemaining, msToSeconds, isWithinTime } from '../scraper/utils/VerifyTime';
import modalStateManager from '../models/ModelStateManager';

export default async function ControllerScraperInit(socket: Socket, data: TypeConfig): Promise<void> {
  const botId = data._id; // Usando o _id do bot para controlar o estado
  modalStateManager.setState(botId, { isRunning: true });

  const { startTime, finishTime } = getStartAndFinishTimes(data.CONFIG_TIME_START, data.CONFIG_TIME_FINISH);

  try {
    // Loop para verificar o tempo até o início, mas somente se o estado for "isRunning: true"
    while (!isWithinTime(startTime, finishTime)) {
      const currentState = modalStateManager.getState(botId);
      if (!currentState.isRunning) {
        console.log(`Bot ${botId} foi interrompido antes de iniciar.`);
        return; // Sai completamente da função se o estado for "isRunning: false"
      }

      const timeUntilStart = getTimeUntilStart(startTime);
      const secondsUntilStart = msToSeconds(timeUntilStart);
      console.log(`Bot ${botId} fora do horário configurado. Aguardando ${secondsUntilStart} segundos até a inicialização...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // ENVIA RESPOSTA DE INÍCIO quando finalmente dentro do horário configurado
    socket.emit('SCRAPER_INIT_RES_ON', {
      title: 'Sucesso',
      message: `Bot ${botId} iniciado!`
    });

    console.log(data);

    // Lógica adicional para o bot rodar durante o período configurado
    while (Date.now() <= finishTime.getTime()) {
      // Verifica se o estado do bot foi alterado para parar
      const currentState = modalStateManager.getState(botId);
      if (!currentState.isRunning) {
        console.log(`Bot ${botId} interrompido durante a execução.`);
        break; // Sai do loop de execução se o estado for "isRunning: false"
      }

      const timeRemaining = getTimeRemaining(finishTime);
      const secondsRemaining = msToSeconds(timeRemaining);
      console.log(`Bot ${botId} está rodando. Tempo restante: ${secondsRemaining} segundos.`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // ENVIA RESPOSTA DE TÉRMINO quando o bot terminar o período configurado
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
