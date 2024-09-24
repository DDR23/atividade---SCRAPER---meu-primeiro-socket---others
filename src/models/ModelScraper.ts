import { Page } from "playwright";
import { CompetitionData } from "../types/TypeCompetition";
import { CreateListCompetitions } from "../scraper/CreateListCompetitions";

export class Scraper {
  private intervalId: NodeJS.Timeout | null = null;
  private competitionsData: { [configId: string]: CompetitionData } = {};
  private isRunning: boolean = true;

  constructor(private page: Page, private configId: string, private interval: number) { }

  async start() {
    if (!this.isRunning) return;
    console.log(`Iniciando scraping para o configId: ${this.configId}`);
    await this.collectData();
    this.intervalId = setInterval(() => {
      if (this.isRunning) {
        this.collectData();
      }
    }, this.interval);
  }

  async stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isRunning = false;
      console.log(`Scraping para o configId: ${this.configId} foi interrompido.`);
    }
    await this.page.close();
  }

  private async collectData() {
    if (!this.isRunning) return;
    try {
      console.log(`Coletando dados para configId: ${this.configId}`);
      const listCompetitions = await CreateListCompetitions(this.page);
      this.competitionsData[this.configId] = { configId: this.configId, lista: listCompetitions };
    } catch (error) {
      if ((error as Error).message.includes('Target page, context or browser has been closed')) {
        console.warn(`Coleta de dados interrompida para configId: ${this.configId} - A página foi fechada.`);
      } else {
        console.error('Erro ao coletar dados:', error);
      }
    }
  }

  getCompetitionsData() {
    return this.competitionsData;
  }
}
