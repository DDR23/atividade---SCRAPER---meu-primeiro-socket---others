export interface TypeStrategyTenis {
  _id: string; // Identificador único da estratégia

  // Configurações de diferença de sets
  STRATEGY_DIFF_SET_TYPE: 'diff' | 'exato'; // Tipo de diferença de sets (diferença ou valor exato)
  STRATEGY_DIFF_SET: number; // Diferença total de sets
  STRATEGY_DIFF_SET_PLAYER1: number; // Diferença de sets para o jogador 1
  STRATEGY_DIFF_SET_PLAYER2: number; // Diferença de sets para o jogador 2

  // Configurações de diferença de pontos
  STRATEGY_DIFF_POINT_TYPE: 'diff' | 'exato'; // Tipo de diferença de pontos (diferença ou valor exato)
  STRATEGY_DIFF_POINT: number; // Diferença total de pontos
  STRATEGY_DIFF_POINT_PLAYER1: number; // Diferença de pontos para o jogador 1
  STRATEGY_DIFF_POINT_PLAYER2: number; // Diferença de pontos para o jogador 2

  // Configurações de entrada e multiplicador
  STRATEGY_MULTIPLIER: number; // Multiplicador da estratégia (para calcular os ganhos)
  STRATEGY_ENTRY_VALUE: number; // Valor de entrada (aposta inicial)

  // Regras de parada da estratégia
  STRATEGY_STOP: boolean; // Indicador para parar a estratégia
  STRATEGY_STOP_WIN: number; // Limite de ganho para parar
  STRATEGY_STOP_LOSS: number; // Limite de perda para parar

  // Outras configurações
  STRATEGY_CONFIG: string; // Configuração específica da estratégia

  // Datas de criação e atualização
  createdAt: Date; // Data de criação da estratégia
  updatedAt: Date; // Data da última atualização da estratégia
}
