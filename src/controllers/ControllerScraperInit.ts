import { Socket } from 'socket.io';
import { TypeConfig } from '../types/TypeConfig';
import { StartScraper } from '../scraper/StartScraper';
import { CloseBrowser, OpenBrowser } from '../scraper/SetupBrowser';
import { Scraper } from '../models/ModelScraper';

export default async function ControllerScraperInit(socket: Socket, data: TypeConfig) {
  let scraper: Scraper | null = null;

  try {
    await OpenBrowser();
    const page = await StartScraper(data); // LOGIN
    scraper = new Scraper(page, data._id, 1000);
    await scraper.start(); // CRIA A LISTA DE JOGOS ATUALIZADA EM TEMPO REAL

    socket.emit('SCRAPER_INIT_RES', {
      title: 'Sucesso',
      message: 'A configuração foi processada com sucesso!',
    });

    // Adicione um ouvinte para parar o scraper quando solicitado
    // socket.on('STOP_SCRAPER', async () => {
    //   if (scraper) {
    //     await scraper.stop(); // Interrompa o scraping
    //     socket.emit('SCRAPER_STOP_RES', {
    //       title: 'Parado',
    //       message: 'O scraper foi parado com sucesso.',
    //     });
    //   } else {
    //     socket.emit('SCRAPER_STOP_RES', {
    //       title: 'Erro',
    //       message: 'Nenhum scraper em execução.',
    //     });
    //   }
    // });

  } catch (error) {
    socket.emit('SCRAPER_INIT_RES', {
      title: 'Erro',
      message: (error as Error).message || 'A ação não pode ser finalizada.',
    });
  } finally {
    try {
      // Feche o navegador se estiver aberto
      // if (scraper) {
      //   await scraper.stop(); // Garante que o scraper seja parado
      // }
      // await CloseBrowser();
    } catch (closeError) {
      console.error('Erro ao fechar o navegador:', closeError);
    }
  }
}
