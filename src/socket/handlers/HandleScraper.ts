import { Socket } from "socket.io";
import ControllerScraperInit from "../../controllers/ControllerScraperInit";
import { TypeConfig } from "../../types/TypeConfig";
import ControllerScraperFinish from "../../controllers/ControllerScraperFinish";

export default function HandleScraper(socket: Socket) {
  socket.on('SCRAPER_INIT', (data: TypeConfig) => ControllerScraperInit(socket, data));
  socket.on('SCRAPER_FINISH', (id: string) => ControllerScraperFinish(socket, id));
}