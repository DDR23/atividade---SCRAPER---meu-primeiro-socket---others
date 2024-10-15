import { Browser, Page } from "playwright";
import { TypeConfig } from "../types/TypeConfig";

export class Store {
  static data: {
    [executionId: string]: {
      config?: TypeConfig;
      browser?: Browser;
      page?: Page;
      myBet?: Page;
      isRunning?: boolean;
    };
  } = {};

  constructor(initialState: { executionId: string; data: any }) {
    Store.data[initialState.executionId] = initialState.data;
  }

  update(executionId: string, newData: any) {
    Store.data[executionId] = { ...Store.data[executionId], ...newData };
  }
}
