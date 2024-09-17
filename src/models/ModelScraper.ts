import { Page } from "playwright";
import { CompetitionData } from "../types/TypeCompetition";
import { CreateListCompetitions } from "../scraper/CreateListCompetitions";

export class Scraper {
  private page: Page;
  private strategyId: string;
  private interval: number;
  private intervalId: NodeJS.Timeout | null = null;
  private competitionsData: { [strategyId: string]: CompetitionData } = {};

  constructor(page: Page, strategyId: string, interval: number) {
    this.page = page;
    this.strategyId = strategyId;
    this.interval = interval;
  }

  async start() {
    await this.collectData();
    this.intervalId = setInterval(() => this.collectData(), this.interval);
  }

  async stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Scraping interrompido.');
    }
  }

  private async collectData() {
    try {
      const listCompetitions = await CreateListCompetitions(this.page);
      this.competitionsData[this.strategyId] = {
        configId: this.strategyId,
        lista: listCompetitions
      };
    } catch (error) {
      console.error('Erro ao coletar dados:', error);
    }
  }

  getCompetitionsData() {
    return this.competitionsData;
  }
}
