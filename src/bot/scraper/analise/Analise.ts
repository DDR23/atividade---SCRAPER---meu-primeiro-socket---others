import { TypeConfig } from "../../types/TypeConfig";
import { TypeStrategyTenis } from "../../types/TypeStrategy";
import DiffPoints from "../strategies/DiffPoints";
import GameTime from "../strategies/GameTime";
import OddValue from "../strategies/OddValue";
import verifyHistorico from "./VerifyHistorico";

export function analise(data: any, config: TypeConfig, store: any) {
  try {
    const estrategias: TypeStrategyTenis[] = config.CONFIG_STRATEGIES; // Obtém as estratégias do config
    let resultAnalise: any[] = [];

    estrategias.forEach((element) => {
      const { 
        STRATEGY_DIFF_SET_TYPE,
        STRATEGY_DIFF_SET,
        STRATEGY_DIFF_POINT,
        STRATEGY_ENTRY_VALUE
      } = element;

      let shouldAnalyze = STRATEGY_DIFF_SET_TYPE === 'diff' && STRATEGY_DIFF_SET > 0;

      if (shouldAnalyze) {
        let dicionarioVariaveis = {
          difPontos: STRATEGY_DIFF_SET,
          vOdd: STRATEGY_DIFF_POINT,
          tempGame: STRATEGY_DIFF_SET // Suponha que isso possa ser ajustado conforme sua lógica
        };

        let dicionarioFunctions = {
          difPontos: DiffPoints,
          vOdd: OddValue,
          tempGame: GameTime
        };

        let functionFinal: any[] = [];
        Object.keys(dicionarioVariaveis).forEach((key) => {
          const variaveis = dicionarioVariaveis[key as keyof typeof dicionarioVariaveis];
          const functions = dicionarioFunctions[key as keyof typeof dicionarioFunctions];
          if (variaveis > 0) {
            functionFinal.push(functions(data, variaveis));
          }
        });

        const saidaFunction = findMatchingObjects(functionFinal, STRATEGY_DIFF_POINT, store);
        saidaFunction.forEach((element: any) => {
          element.valorAposta = STRATEGY_ENTRY_VALUE;
          resultAnalise.push(element);
        });
      }
    });

    return resultAnalise;

  } catch (error) {
    console.log(error);
  }
}

function findMatchingObjects(arrays: any[], timeGame: number, store: any) {
  if (arrays.length === 0 || arrays.some((element) => element === false)) {
    return [];
  }

  return arrays.reduce((result, currentArray) => {
    result = currentArray.filter((obj: any) =>
      arrays.every((array: any) =>
        array.some((item: any) => {
          return (
            item.jogoID === obj.jogoID &&
            item.minutos === obj.minutos &&
            (timeGame == 0 || timeGame == obj.minutos) &&
            verifyHistorico(item.jogoID, store)
          );
        })
      )
    );
    return result;
  }, []);
}
