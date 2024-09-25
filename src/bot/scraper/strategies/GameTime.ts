export function GameTime(partidas: any, tempoLimite: number) {
  let result: any[] = [];

  Object.keys(partidas).forEach((minutos) => {
    const partida = partidas[minutos];
    const gameTime = partida.tempo;

    if (gameTime > tempoLimite) {
      const vencedorIndex = partida.pontos[0] > partida.pontos[1] ? 0 : 1;
      result.push({
        minutos,
        jogoID: partida.jogoID,
        timeWin: vencedorIndex === 0 ? partida.time1.nome : partida.time2.nome,
        tempo: gameTime,
      });
    }
  });

  return result.length === 0 ? false : result;
}

export default GameTime;
