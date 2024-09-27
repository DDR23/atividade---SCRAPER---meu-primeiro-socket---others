import { Socket } from 'socket.io';
import { TypeConfig } from '../types/TypeConfig';
import { initBot } from '../bot/BotInit';
import { setShouldStop, getShouldStop } from '../controllers/ControllerScraperFinish';
import { OpenBrowser, CloseBrowser } from '../utils/ConfigBrowser';

class ModelBot {
  private activeBots: Map<string, Promise<void>> = new Map();

  async startBot(socket: Socket, config: TypeConfig, executionId: string) {
    if (this.activeBots.has(executionId)) {
      console.log(`Bot ${executionId} já está em execução.`);
      return;
    }

    setShouldStop(executionId, false);
    await OpenBrowser();

    const botPromise = initBot(socket, config, executionId).finally(() => {
      this.activeBots.delete(executionId);
      CloseBrowser();
    });

    this.activeBots.set(executionId, botPromise);
  }

  async stopBot(executionId: string) {
    if (!this.activeBots.has(executionId)) {
      console.log(`Bot ${executionId} não está em execução.`);
      return;
    }

    setShouldStop(executionId, true);
    await this.activeBots.get(executionId);
  }

  async stopAllBots() {
    const stopPromises = Array.from(this.activeBots.keys()).map(id => this.stopBot(id));
    await Promise.all(stopPromises);
  }

  isRunning(executionId: string): boolean {
    return this.activeBots.has(executionId);
  }

  getRunningBots(): string[] {
    return Array.from(this.activeBots.keys());
  }
}

export const modelBot = new ModelBot();