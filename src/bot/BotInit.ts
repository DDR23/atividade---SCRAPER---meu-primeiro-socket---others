import { Socket } from "socket.io";
import { Store } from "../models/ModelBot";
import { CreateListCompetitions } from "./CreateListCompetition";
import AnaliseBets from "./AnaliseBets";

export default async function BotInit(socket: Socket, executionId: string) {
  setInterval(async () => {
    try {
      const data = Store.data;
      const { page, myBet } = data[executionId];
      if (!page || !myBet) return;

      const isClosed = page.isClosed();
      if (isClosed) return;

      let listCompetition = await CreateListCompetitions(page);
      let resAnaliseBets = AnaliseBets(listCompetition, data[executionId].config?.CONFIG_STRATEGIES);

      if (resAnaliseBets.length > 0) {
        resAnaliseBets.forEach(game => {
          console.log(game);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, 1000);
}
