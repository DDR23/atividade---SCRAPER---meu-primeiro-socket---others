export interface TimeInfo {
  name: string;
  sets: number;
  points: number;
  odd: number;
}

export interface Game {
  time_one: TimeInfo;
  time_two: TimeInfo;
}

export interface TypeCompetition {
  name_competition: string;
  games: Game[];
}

export interface CompetitionData {
  configId: string;
  lista: TypeCompetition[];
}
