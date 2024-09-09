import { TypeStrategyTenis } from "./TypeStrategy";

export interface TypeConfig {
  _id: string;
  CONFIG_USER: string;
  CONFIG_PASSWORD: string;
  CONFIG_TIME_START: string;
  CONFIG_TIME_FINISH: string;
  CONFIG_STATUS: boolean;
  CONFIG_ENTRIES: number;
  CONFIG_RESULT: number;
  CONFIG_STRATEGIES: TypeStrategyTenis[];
  createdAt: Date;
  updatedAt: Date;
}