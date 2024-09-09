import { Socket } from "socket.io";
import { TypeConfig } from "../types/TypeConfig";

export default async function ControllerScraperInit(socket: Socket, data: TypeConfig) {
  try {
    (async () => {
      try {
        console.log('Configuração recebida:', data);

        // Realize aqui o processamento necessário para a configuração
        // (por exemplo, iniciar um scraper ou outra operação)

        // Emita uma resposta indicando sucesso
        socket.emit('SCRAPER_INIT_RES', {
          title: 'Sucesso',
          message: 'A configuração foi processada com sucesso!'
        });
      } catch (error) {
        socket.emit('SCRAPER_INIT_RES', {
          title: 'Erro',
          message: (error as Error).message || 'A ação não pode ser finalizada.',
        });
      }
    })();
  } catch (error) {
    socket.emit('SCRAPER_INIT_RES', {
      title: 'Erro',
      message: (error as Error).message || 'A ação não pode ser finalizada.',
    });
  }
}
