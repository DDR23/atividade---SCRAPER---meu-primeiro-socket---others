import { Socket } from "socket.io";
import { Store } from "../models/ModelBot";
import { CreateListCompetitions } from "./CreateListCompetition";
import { AnaliseBets } from "./AnaliseBets";

export default async function BotInit(socket: Socket, executionId: string) {
  try {
    const data = Store.data;
    const { page, myBet } = data[executionId];
    if (!page || !myBet) return;

    const isClosed = page.isClosed();
    if (isClosed) return;

    // let html = await page.innerHTML('.ovm-CompetitionList');
    let listCompetition = await CreateListCompetitions(page);
    let resAnalise = await AnaliseBets(listCompetition, data[executionId].config?.CONFIG_STRATEGIES);

    console.log('bot iniciado');
  } catch (error) {
    console.log(error);
  }
}
