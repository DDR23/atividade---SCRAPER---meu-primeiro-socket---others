import { Socket } from 'socket.io';
import { TypeConfig } from '../types/TypeConfig';
import { StartScraper } from '../scraper/StartScraper';
import { CloseBrowser, OpenBrowser } from '../scraper/SetupBrowser';
import { CreateListCompetitions } from '../scraper/CreateListCompetitions';

export default async function ControllerScraperInit(socket: Socket, data: TypeConfig) {
  try {
    await OpenBrowser();
    const page = await StartScraper(data);
    await CreateListCompetitions(page, 1000);

    // TODO - a criação de um output.json pode cusar conflito em multiplos bots

    socket.emit('SCRAPER_INIT_RES', {
      title: 'Sucesso',
      message: 'A configuração foi processada com sucesso!',
    });
  } catch (error) {
    console.error('Erro ao iniciar o scraper:', error);
    socket.emit('SCRAPER_INIT_RES', {
      title: 'Erro',
      message: (error as Error).message || 'A ação não pode ser finalizada.',
    });
  } finally {
    try {
      // await CloseBrowser();
    } catch (closeError) {
      console.error('Erro ao fechar o navegador:', closeError);
    }
  }
}
