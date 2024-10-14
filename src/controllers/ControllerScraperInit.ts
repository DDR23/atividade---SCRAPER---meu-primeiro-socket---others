import { Socket } from "socket.io";
import { TypeConfig } from "../types/TypeConfig";
import BotInit from "../bot/BotInit";
import { Store } from "../models/ModelBot";

export default function ControllerScraperInit(socket: Socket, data: TypeConfig | TypeConfig[]) {
  const configs = Array.isArray(data) ? data : [data];
  configs.forEach(config => {
    const store = new Store(config);
    store.update({
      executionId: config._id,
      socket: socket,
      config: config,
    });
    BotInit();
  });
}
