import { Socket } from 'socket.io';
import { TypeConfig } from '../types/TypeConfig';
import { getStartAndFinishTimes, getTimeUntilStart, getTimeRemaining, msToSeconds, isWithinTime } from '../scraper/utils/VerifyTime';

export default async function ControllerScraperInit(socket: Socket, data: TypeConfig) {
  const { startTime, finishTime } = getStartAndFinishTimes(data.CONFIG_TIME_START, data.CONFIG_TIME_FINISH);

  // Loop para verificar o tempo até o início
  while (!isWithinTime(startTime, finishTime)) {
    const timeUntilStart = getTimeUntilStart(startTime);
    const secondsUntilStart = msToSeconds(timeUntilStart);
    console.log(`Fora do horário configurado. Aguardando ${secondsUntilStart} segundos até a inicialização...`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  try {
    // ENVIA RESPOSTA DE INÍCIO
    socket.emit('SCRAPER_INIT_RES_ON', {
      title: 'Sucesso',
      message: 'Bot iniciado!'
    })

    console.log(data);

    // Lógica adicional para o bot rodar durante o período configurado
    while (Date.now() <= finishTime.getTime()) {
      const timeRemaining = getTimeRemaining(finishTime);
      const secondsRemaining = msToSeconds(timeRemaining);
      console.log(`Bot está rodando. Tempo restante: ${secondsRemaining} segundos.`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // ENVIA RESPOSTA DE TÉRMINO
    socket.emit('SCRAPER_INIT_RES_OFF', {
      title: 'Sucesso',
      message: 'Bot encerrado!'
    })

  } catch (error) {
    socket.emit('SCRAPER_INIT_RES', {
      title: 'Erro',
      message: (error as Error).message || 'A ação não pode ser finalizada.',
    });
  }
}
