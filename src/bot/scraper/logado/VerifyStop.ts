
import { Store } from "../utils/Store.js";

export async function VerifyStop(store: Store) {
  try {
    const pageMyBet = store.data.myBet
    let html = await pageMyBet.$(".mbl-MyBets_Container") ? await pageMyBet.innerHTML(".mbl-MyBets_Container") : false;
    if(!html){
      return {
        status: true,
        config: store.data.config
      }
    }

    const config = store.data.config;
    const executionId = store.data.executionId;
    let histBet = html ? createListBet(html) : html;
    const payload = Object.keys(histBet).map((gameId) => {
      const game = histBet[gameId];
      return {
        gameId: gameId,
        finalValue: game.valorRetorno.toString(),
      };
    });
    await $axios.put(`/logs/${config.id}`, { data: payload });
    // todo: change this as the config wont be recreated
    const listBet = await $axios.get(`/logs/${config.id}/${executionId}`);
    let valueWin = parseFloat(config.stopWin);
    let valueLoss = parseFloat(config.stopLoss) * -1;
    let valueWinMoment = 0;
    let valueLossMoment = 0;
    let valueBet = 0;
    listBet.data.forEach((element) => {
      let id = element.gameId;
      if (id in histBet) {
        valueBet += histBet[id].valorAposta;
        let resultAposta = parseFloat(histBet[id].resultado);
        if (resultAposta > 0) {
          valueWinMoment += resultAposta;
        } else if (resultAposta < 0) {
          valueLossMoment += Math.abs(resultAposta);
        }
      }
    });
    let valueWinLoss = valueWinMoment - valueLossMoment;
    const horas = new Date().toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });

    const obj = {
      status: true,
      typeStop: "",
      data: {
        time: horas,
        listBet: listBet.data,
        resultGeral: {
          valueBet: valueBet,
          valueWin: valueWinMoment,
          valueLoss: valueLossMoment,
          total: valueWinLoss,
        },
      },
      config: config,
    };

    if (listBet.data.length < 1) {
      return obj;
    }

    if (valueWinLoss >= valueWin) {
      obj.status = false;
      obj.typeStop = "win";
      socket.emit("stop__win", obj);

      return obj;
    } else if (valueWinLoss <= valueLoss) {
      obj.status = false;
      obj.typeStop = "loss";
      socket.emit("stop__loss", obj);
      return obj;
    } else {
      return obj;
    }
  } catch (error) {
    console.log(error);
    socket.emit("bot__error", {config: store.data.config, message: "Erro CRITICO durante a verificação de STOP", error: `${error}`})
  }
}
