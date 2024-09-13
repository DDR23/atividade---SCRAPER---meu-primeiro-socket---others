interface TimeInfo {
  name: string;
  sets: number;
  points: number;
  odd: number;
}

interface Game {
  time_one: TimeInfo;
  time_two: TimeInfo;
}

export interface TypeCompetition {
  name_competition: string;
  games: Game[];
}