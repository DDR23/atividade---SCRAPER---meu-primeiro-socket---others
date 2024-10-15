import { Socket } from "socket.io";
import { Store } from "../models/ModelBot";

export default async function BotInit(socket: Socket, executionId: string) {
  try {
    const data = Store.data;
    const { page, myBet } = data[executionId];
    if (!page || !myBet) return;

    const isClosed = page.isClosed();
    if (isClosed) return;

    let html = await page.innerHTML('.ovm-CompetitionList');
    console.log(html);

    console.log('bot iniciado');
  } catch (error) {
    console.log(error);
  }
}
