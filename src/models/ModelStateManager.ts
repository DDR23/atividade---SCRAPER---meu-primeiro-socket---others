import { EventEmitter } from 'events';

// Define a interface para o estado de cada bot
interface BotState {
  isRunning: boolean;
}

// Gerencia o estado de execução de vários bots simultaneamente
class ModalStateManager extends EventEmitter {
  private botsState: Record<string, BotState>; // Armazena o estado de cada bot por ID

  constructor() {
    super();
    this.botsState = {};
  }

  // Define o estado de um bot específico
  setState(botId: string, newState: Partial<BotState>): void {
    this.botsState[botId] = { ...this.botsState[botId], ...newState };
    this.emit('stateChanged', botId, this.botsState[botId]); // Emite um evento com o ID do bot
  }

  // Retorna o estado de um bot específico
  getState(botId: string): BotState {
    return this.botsState[botId] || { isRunning: true }; // Por padrão, considera o bot rodando
  }
}

const modalStateManager = new ModalStateManager();
export default modalStateManager;
