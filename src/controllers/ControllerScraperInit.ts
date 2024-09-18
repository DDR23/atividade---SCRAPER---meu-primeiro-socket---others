import { Socket } from 'socket.io';
import { TypeConfig } from '../types/TypeConfig';

export default async function ControllerScraperInit(socket: Socket, data: TypeConfig) {
  try {
    const { CONFIG_TIME_START, CONFIG_TIME_FINISH } = data;

    // todo - aqui eu preciso pegar o horario de inicio e termino da config e setar pra que o try sode dentro do horario definido

    socket.emit('SCRAPER_INIT_RES', {
      title: 'Sucesso',
      message: 'A configuração foi processada com sucesso!',
    });

  } catch (error) {
    socket.emit('SCRAPER_INIT_RES', {
      title: 'Erro',
      message: (error as Error).message || 'A ação não pode ser finalizada.',
    });
  }
}













// await OpenBrowser();
// const page = await StartScraper(data); // LOGIN
// scraper = new Scraper(page, data._id, 1000);
// await scraper.start(); // CRIA A LISTA DE JOGOS ATUALIZADA EM TEMPO REAL



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
