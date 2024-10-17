import { Game, TypeCompetition } from "../types/TypeCompetition";
import { TypeStrategyTenis } from "../types/TypeStrategy";

export default function AnaliseBets(listCompetition: TypeCompetition[], strategies: TypeStrategyTenis[] | undefined) {
  let resAnaliseBets: Game[] = []; // Array para armazenar dados dos jogos

  if (strategies && listCompetition.length > 0) {
    strategies.forEach(strategy => {
      listCompetition.forEach(competition => {
        // Apply strategy based on competition details
        if (strategy.STRATEGY_DIFF_POINT_TYPE === 'diff') {
          const diffSets = competition.games.reduce((acc, game) => {
            return acc + (game.time_one.points - game.time_two.points);
          }, 0);
          if (diffSets >= strategy.STRATEGY_DIFF_POINT) {
            // Encontra o jogo correspondente
            const matchingGame = competition.games.find(game => (game.time_one.points - game.time_two.points) === diffSets);
            if (matchingGame) {
              resAnaliseBets.push(matchingGame); // Armazena apenas os dados do jogo
            }
          }
        }
      });
    });
  }

  return resAnaliseBets;
}
