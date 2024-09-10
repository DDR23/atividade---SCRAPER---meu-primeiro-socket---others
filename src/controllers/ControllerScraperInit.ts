import { Socket } from 'socket.io';
import { TypeConfig } from '../types/TypeConfig';
import { StartScraper } from '../scraper/StartScraper';
import { CloseBrowser, OpenBrowser } from '../scraper/SetupBrowser';

export default async function ControllerScraperInit(socket: Socket, data: TypeConfig) {
  try {
    await OpenBrowser();
    await StartScraper(data);

    socket.emit('SCRAPER_INIT_RES', {
      title: 'Sucesso',
      message: 'A configuração foi processada com sucesso!'
    });
  } catch (error) {
    console.error('Erro ao iniciar o scraper:', error);
    socket.emit('SCRAPER_INIT_RES', {
      title: 'Erro',
      message: (error as Error).message || 'A ação não pode ser finalizada.',
    });
  } finally {
    try {
      await CloseBrowser();
    } catch (closeError) {
      console.error('Erro ao fechar o navegador:', closeError);
    }
  }
}
