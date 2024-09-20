import { Socket } from "socket.io";
import { TypeConfig } from "../types/TypeConfig";

export default function ControllerScraperFinish(socket: Socket, data: TypeConfig) {
  // TODO - adicionar função que seta um estado global pra false caso acionado, enquanto nao acionado esse estado como true deve permitir que o bot rode.
}