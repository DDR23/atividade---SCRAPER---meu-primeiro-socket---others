import { EventEmitter } from 'events';

interface BotState {
  isRunning: boolean;
}

class ModelStateManager extends EventEmitter {
  private botsState: Record<string, BotState> = {};

  setState(botId: string, newState: Partial<BotState>): void {
    this.botsState[botId] = { ...this.botsState[botId], ...newState };
    this.emit('stateChanged', botId, this.botsState[botId]);
  }

  getState(botId: string): BotState {
    return this.botsState[botId] || { isRunning: true };
  }
}

const modelStateManager = new ModelStateManager();
export default modelStateManager;
