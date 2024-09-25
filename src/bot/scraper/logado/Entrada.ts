import { Store } from "../utils/Store";

export async function Entrada(obj: any, store: Store) {
  /**
   * @type {import("playwright").Page}
   *
   */
  const page = store.data.page;
  try {
    let stop = await verifyStop(store);
    if (!stop.status) return true;

    let entradas = obj[0];
    let valorEntrada = entradas.valorAposta.includes(".")
      ? entradas.valorAposta.replace(".", ",").split("")
      : entradas.valorAposta.split("");

    await closeBet(store);
    const existFecharPopup = await myWaitForSelector({
      selector: ".bss-ReceiptContent_Done",
      store: store,
      timeout: 1000,
    });
    if (existFecharPopup) {
      await existFecharPopup.click({ delay: getRandomNumber(100, 200) });
      await page.reload();
      return;
    }
    const colection = await page.$$(
      ".ovm-HorizontalMarket_Participant.ovm-ParticipantOddsOnly.gl-Participant_General"
    );

    let html = await page.innerHTML(".ovm-CompetitionList");
    let data = scrapperDataBet(html);
    const item = data[entradas.minutos][entradas.jogoID];
    const index =
      item.time1.nome === entradas.timeWin
        ? item.time1.index
        : item.time2.index;
    const elementAposta = colection[index];
    await elementAposta.click({ delay: getRandomNumber(100, 200) });

    console.log("1");
    const input = await myWaitForSelector({
      selector: ".bsf-StakeBox_StakeInput",
      store: store,
      timeout: 10000,
    });
    if (!input) return;
    console.log("2");
    await page.waitForTimeout(getRandomNumber(400, 800));
    await input.click({ delay: getRandomNumber(100, 200) });
    for (let uni of valorEntrada) {
      await page.waitForTimeout(getRandomNumber(150, 450));
      await page.keyboard.press(uni);
    }

    console.log("3");
    await page.waitForTimeout(getRandomNumber(500, 1000));
    let buttonAposta = await myWaitForSelector({
      selector: ".bsf-PlaceBetButton_Wrapper",
      timeout: 800,
      store: store,
    });
    console.log("4");
    if (!buttonAposta) {
      console.log("nao tem botao");
      let html = await page.innerHTML(".ovm-CompetitionList");
      let dadosJson = scrapperDataBet(html);
      let difGolJogo = dadosJson[entradas.minutos][entradas.jogoID].difGol;
      if (difGolJogo >= entradas.difGol) {
        buttonAposta = await page.$(".bsf-AcceptButton");
      } else {
        await closeBet(store);
        return;
      }
    }

    console.log("5");
    await page.waitForTimeout(getRandomNumber(400, 800));
    let textAposta = await page.innerText(".bss-NormalBetItem_Title");
    if (textAposta != entradas.timeWin) {
      await closeBet(store);
      return;
    }

    console.log("6");
    await page.waitForTimeout(getRandomNumber(600, 900));
    await buttonAposta.click({ delay: getRandomNumber(100, 200) });

    await page.waitForTimeout(getRandomNumber(500, 1000));
    const fecharPopup = await myWaitForSelector({
      selector: ".bss-ReceiptContent_Done",
      store: store,
    });
    console.log("7");
    if (!fecharPopup) {
      await closeBet(store);
      return;
    }

    console.log("8");
    await page.waitForTimeout(getRandomNumber(500, 1000));
    await fecharPopup.click({ delay: getRandomNumber(100, 200) });

    console.log("9");
    await createBetLog(entradas, store);

    console.log("10");
    stop["bet"] = entradas;

    socket.emit("bet", stop);
    console.log("11");

    await page.waitForTimeout(getRandomNumber(500, 1000));

    await page.reload();
  } catch (error) {
    console.log("ESSE É OP CAAAAAAAAAAAAAAAAAAATCH");
    console.log(error);
    socket.emit("bot__error", {
      config: store.data.config,
      message: "algum erro durante a entrada",
      error: `${error}`,
    });
    await closeBet();
    Logger.sign(`${store.data.executionId}.*`);
  }
}
