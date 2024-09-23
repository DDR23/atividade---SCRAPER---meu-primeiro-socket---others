import { EventEmitter } from 'events';

interface BotState {
  isRunning: boolean;
}

class ModalStateManager extends EventEmitter {
  private botsState: Record<string, BotState>;

  constructor() {
    super();
    this.botsState = {};
  }

  setState(botId: string, newState: Partial<BotState>): void {
    this.botsState[botId] = { ...this.botsState[botId], ...newState };
    this.emit('stateChanged', botId, this.botsState[botId]);
  }

  getState(botId: string): BotState {
    return this.botsState[botId] || { isRunning: true };
  }
}

const modalStateManager = new ModalStateManager();
export default modalStateManager;