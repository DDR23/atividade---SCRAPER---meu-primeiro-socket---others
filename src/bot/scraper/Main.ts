import { TypeConfig } from "../types/TypeConfig";
import { CreateListCompetitions } from "./CreateListCompetitions";
import { MakeLogin } from "./MakeLogin";
import { analise } from "./analise/Analise";
import { checkLoggedIn } from "./logado/CheckLoggedIn";
import { Entrada } from "./logado/Entrada";
import { BaseReLogin } from "./utils/BaseReLogin";
import { ConfigBrowser } from "./utils/ConfigBrowser";
import { Store } from "./utils/Store";
import { schedule } from "node-cron";

export default function Main(configs: TypeConfig[]) {
  configs.forEach(async (config) => {
    const store = new Store();
    try {
      store.update({
        config: config,
        log: []
      });

      //INICIAR APOSTA
      const iniciarAposta = () => {
        let count = 0;
        console.log('socket.emit("bot__start", store.data.config);') // TODO - possivel socket.emit
        async function UpdateData() {
          try {
            const page = store.data.page;
            const myBet = store.data.myBet;
            const isClosed = await page.isClosed();
            if (isClosed) return;

            let html = await page.innerHTML(".ovm-CompetitionList");
            let data = CreateListCompetitions(html);
            let resAnalise: any[] | undefined = analise(data, store.data.config, store);

            if (Array.isArray(resAnalise) && resAnalise.length > 0) {
              const loggedIn = await myBet.$('[data-content="Todos"]');
              if (loggedIn) {
                await BaseReLogin(store);
                UpdateData();
              }
              let buttonTodosClassList = await myBet.locator('[data-content="Todos"]')?.getAttribute("class");
              if (buttonTodosClassList?.includes("mbl-HeaderButton-selected")) {
                const elements = await myBet.$$(".mbl-SettledBetItem_Collapsed");
                for (const element of elements) {
                  await myBet.evaluateHandle((el: any) => el.click(), element);
                }
              } else {
                await myBet.click('[data-content="Todos"]');
                const elements = await myBet.$$(".mbl-SettledBetItem_Collapsed");
                for (const element of elements) {
                  await myBet.evaluateHandle((el: any) => el.click(), element);
                }
              }
              await Entrada(resAnalise, store);
              const logado = await checkLoggedIn(store);
              if (!logado) await BaseReLogin(store);
              count = 0;
            } else {
              count++;
              console.log(count);
              if (count >= 900) {
                await page.reload();
                count = 0;
              }
            }
          } catch (error) {
            console.log(error);
          }
        }
      };

      //STARTJOB
      const startJob = schedule(
        //PRIMEIRO PARAMETRO NO NODE-CRON
        `0 ${config.CONFIG_TIME_START.split(":")[1]} ${config.CONFIG_TIME_START.split(":")[0]} * * *`,

        //SEGUNDO PARAMETRO NO NODE-CRON
        async () => {
          const browser = await ConfigBrowser();
          store.update({
            browser: browser,
            executionId: Date.now() + config._id,
          });

          console.log('chegou ate aqui, vai iniciar o login')
          const { myBet, page } = await MakeLogin(store);
          store.update({
            page: page,
            myBet: myBet,
          });
          console.log('chegou ate aqui, salvou a instancia do store')
          console.log('proximo passo é iniciar aposta')
          // await iniciarAposta();
        },
        {
          timezone: "America/Sao_Paulo",
        }
      );

      //FINISHJOB
      const finishJob = schedule(
        `0 ${config.CONFIG_TIME_FINISH.split(":")[1]} ${config.CONFIG_TIME_FINISH.split(":")[0]} * * *`,
        async () => {
          // await pararAposta(store);
          startJob.stop();
          finishJob.stop();
        },
        {
          timezone: "America/Sao_Paulo",
        }
      );

    } catch (error) {

    }
  })
}