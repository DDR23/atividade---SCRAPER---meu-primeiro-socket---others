import { Socket } from "socket.io";
import ControllerScraperInit from "../../controllers/ControllerScraperInit";
import { TypeConfig } from "../../types/TypeConfig";

export default function HandleScraper(socket: Socket) {
  socket.on('SCRAPER_INIT', (data: TypeConfig) => ControllerScraperInit(socket, data));
}