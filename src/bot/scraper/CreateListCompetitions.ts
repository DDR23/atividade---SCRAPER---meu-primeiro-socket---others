import { Page } from "playwright";
import { TypeCompetition } from "../../types/TypeCompetition";

export async function CreateListCompetitions(page: Page): Promise<TypeCompetition[]> {
  try {
    return await page.$$eval('.ovm-Competition', (competitions) => {
      return competitions.map((competition) => {
        const nameCompetition = (competition.querySelector('.ovm-CompetitionHeader_NameText') as HTMLElement)?.innerText.trim() || '';
        const games = [...competition.querySelectorAll('.ovm-Fixture')].map((game) => {
          const timeOneName = (game.querySelector('.ovm-FixtureDetailsWithIndicators_Team1NameAndKit .ovm-FixtureDetailsWithIndicators_Team') as HTMLElement)?.innerText.trim() || '';
          const timeOneSets = (game.querySelector('.ovm-SetsBasedScores_Team1Wrapper .ovm-SetsBasedScores_TeamOne') as HTMLElement)?.innerText.trim() || '0';
          const timeOnePoints = (game.querySelector('.ovm-SetsBasedScores_PointsWrapper .ovm-SetsBasedScores_Team1Wrapper .ovm-SetsBasedScores_TeamOne') as HTMLElement)?.innerText.trim() || '0';
          const timeOneOdds = [...game.querySelectorAll('.ovm-ParticipantOddsOnly_Odds')].map(odd => parseFloat((odd as HTMLElement)?.innerText.trim() || '0')) || [];
          const timeTwoName = (game.querySelector('.ovm-FixtureDetailsWithIndicators_Team2NameAndKit .ovm-FixtureDetailsWithIndicators_Team') as HTMLElement)?.innerText.trim() || '';
          const timeTwoSets = (game.querySelector('.ovm-SetsBasedScores_Team2Wrapper .ovm-SetsBasedScores_TeamTwo') as HTMLElement)?.innerText.trim() || '0';
          const timeTwoPoints = (game.querySelector('.ovm-SetsBasedScores_PointsWrapper .ovm-SetsBasedScores_Team2Wrapper .ovm-SetsBasedScores_TeamTwo') as HTMLElement)?.innerText.trim() || '0';
          return {
            time_one: {
              name: timeOneName,
              sets: parseInt(timeOneSets, 10),
              points: parseInt(timeOnePoints, 10),
              odd: timeOneOdds[0] || 0,
            },
            time_two: {
              name: timeTwoName,
              sets: parseInt(timeTwoSets, 10),
              points: parseInt(timeTwoPoints, 10),
              odd: timeOneOdds[1] || 0,
            },
          };
        });
        return {
          name_competition: nameCompetition,
          games: games,
        };
      });
    });
  } catch (error) {
    console.error('Erro ao coletar dados:', error);
    throw error;
  }
}
