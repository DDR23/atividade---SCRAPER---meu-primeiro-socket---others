import { Socket } from 'socket.io';
import { CloseBrowser } from '../utils/ConfigBrowser';

const shouldStopMap = new Map<string, boolean>();

export function getShouldStop(executionId: string) {
  return shouldStopMap.get(executionId) || false;
}

export function setShouldStop(executionId: string, value: boolean) {
  shouldStopMap.set(executionId, value);
}

export default async function ControllerScraperFinish(socket: Socket, executionId: string) {
  setShouldStop(executionId, true);
  await CloseBrowser();
  socket.emit('SCRAPER_FINISH_RES', {
    title: 'Sucesso',
    message: 'Bot finalizado com sucesso!',
    executionId: executionId
  });
}
