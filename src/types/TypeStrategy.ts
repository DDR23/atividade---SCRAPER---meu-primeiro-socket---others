export interface TypeStrategyTenis {
  _id: string;
  STRATEGY_DIFF_SET_TYPE: 'diff' | 'exato';
  STRATEGY_DIFF_SET: number;
  STRATEGY_DIFF_SET_PLAYER1: number;
  STRATEGY_DIFF_SET_PLAYER2: number;
  STRATEGY_DIFF_POINT_TYPE: 'diff' | 'exato';
  STRATEGY_DIFF_POINT: number;
  STRATEGY_DIFF_POINT_PLAYER1: number;
  STRATEGY_DIFF_POINT_PLAYER2: number;
  STRATEGY_MULTIPLIER: number;
  STRATEGY_ENTRY_VALUE: number;
  STRATEGY_STOP: boolean;
  STRATEGY_STOP_WIN: number;
  STRATEGY_STOP_LOSS: number;
  STRATEGY_CONFIG: string;
  createdAt: Date;
  updatedAt: Date;
}