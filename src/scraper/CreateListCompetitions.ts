import { Page } from 'playwright';
import { TypeCompetition } from '../types/TypeCompetition';
import fs from 'fs';
import path from 'path';

export async function CreateListCompetitions(page: Page, interval: number): Promise<void> {
  const filePath = path.join(__dirname, 'output.json');
  const collectData = async () => {
    try {
      const listCompetitions: TypeCompetition[] = await page.$$eval('.ovm-Competition', competitions => {
        return competitions.map(competition => {
          const nameCompetition = (competition.querySelector('.ovm-CompetitionHeader_NameText') as HTMLElement)?.innerText || '';
          const games = [...competition.querySelectorAll('.ovm-Fixture')].map(game => {
            const timeOne = (game.querySelector('.ovm-FixtureDetailsWithIndicators_Team1NameAndKit .ovm-FixtureDetailsWithIndicators_Team') as HTMLElement)?.innerText.trim() || '';
            const timeTwo = (game.querySelector('.ovm-FixtureDetailsWithIndicators_Team2NameAndKit .ovm-FixtureDetailsWithIndicators_Team') as HTMLElement)?.innerText.trim() || '';
            const setsTeamOne = (game.querySelector('.ovm-SetsBasedScores_Team1Wrapper .ovm-SetsBasedScores_TeamOne') as HTMLElement)?.innerText.trim() || '0';
            const setsTeamTwo = (game.querySelector('.ovm-SetsBasedScores_Team2Wrapper .ovm-SetsBasedScores_TeamTwo') as HTMLElement)?.innerText.trim() || '0';
            const pointsTeamOne = (game.querySelector('.ovm-SetsBasedScores_PointsWrapper .ovm-SetsBasedScores_Team1Wrapper .ovm-SetsBasedScores_TeamOne') as HTMLElement)?.innerText.trim() || '0';
            const pointsTeamTwo = (game.querySelector('.ovm-SetsBasedScores_PointsWrapper .ovm-SetsBasedScores_Team2Wrapper .ovm-SetsBasedScores_TeamTwo') as HTMLElement)?.innerText.trim() || '0';
            const odds = [...game.querySelectorAll('.ovm-ParticipantOddsOnly_Odds')].map(odd => parseFloat((odd as HTMLElement)?.innerText.trim() || '0'));
            return {
              time_one: {
                name: timeOne,
                sets: parseInt(setsTeamOne),
                points: parseInt(pointsTeamOne),
                odd: odds[0]
              },
              time_two: {
                name: timeTwo,
                sets: parseInt(setsTeamTwo),
                points: parseInt(pointsTeamTwo),
                odd: odds[1]
              },
            };
          });
          return {
            name_competition: nameCompetition,
            games: games
          };
        });
      });
      fs.writeFileSync(filePath, JSON.stringify(listCompetitions, null, 2), 'utf8');
    } catch (error) {
      console.error('Error collecting data:', error);
    }
  };
  await collectData();
  setInterval(collectData, interval);
}
