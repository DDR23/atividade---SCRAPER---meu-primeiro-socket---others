import { TypeCompetition } from "../types/TypeCompetition";
import { TypeConfig } from "../types/TypeConfig";
import { TypeStrategyTenis } from "../types/TypeStrategy";

export async function AnaliseBets(listCompetition: TypeCompetition[], strategies: TypeStrategyTenis[] | undefined) {
  try {
    const competitions = listCompetition;
    const resultAnalise = competitions.filter(competition => {
    });
    return resultAnalise;
  } catch (error) {
    console.log(error);
  }

}
