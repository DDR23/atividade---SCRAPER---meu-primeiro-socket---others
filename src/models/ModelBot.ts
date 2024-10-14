import { Socket } from "socket.io";
import { TypeConfig } from "../types/TypeConfig";
import { Browser, Page } from "playwright";

export class Store {
  static data: {
    executionId?: string;
    socket?: Socket;
    config?: TypeConfig;
    browser?: Browser;
    page?: Page;
    myBet?: Page;
    isRunning?: boolean;
  };

  constructor(initialState: any) {
    Store.data = initialState;
  }

  update(newData: any) {
    Store.data = { ...Store.data, ...newData };
  }
}
