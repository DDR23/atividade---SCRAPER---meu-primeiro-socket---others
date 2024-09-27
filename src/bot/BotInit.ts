import { Socket } from 'socket.io';
import { TypeConfig } from '../types/TypeConfig';
import { getShouldStop } from '../controllers/ControllerScraperFinish';
import { StartScraper } from '../utils/MakeLogin';

export async function initBot(socket: Socket, config: TypeConfig, executionId: string) {
  console.log(`Iniciando bot com ID: ${executionId}`);
  console.log('Configurações recebidas:', config);

  try {
    const page = await StartScraper(config);

    while (!getShouldStop(executionId)) {
      try {
        // Aqui você deve implementar a lógica principal do seu bot
        // Por exemplo:
        // await performBotAction(page, config);

        console.log(`Bot ${executionId} em execução...`);
        
        // Aguarda um curto período antes da próxima iteração
        await new Promise(resolve => setTimeout(resolve, 5000));

      } catch (error) {
        console.error(`Erro na execução do bot ${executionId}:`, error);
        socket.emit('BOT_ERROR', {
          title: 'Erro',
          message: `Ocorreu um erro durante a execução do bot ${executionId}`,
          executionId
        });
        break;
      }
    }

    await page.close();
  } catch (error) {
    console.error(`Erro ao iniciar o bot ${executionId}:`, error);
    socket.emit('BOT_ERROR', {
      title: 'Erro',
      message: `Erro ao iniciar o bot ${executionId}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      executionId
    });
  }

  socket.emit('BOT_FINISHED', {
    title: 'Concluído',
    message: `Bot ${executionId} finalizou a execução`,
    executionId
  });
}
