export function DiffPoints(partidas: any, diferenca: number) {
  let result: any[] = [];
  
  Object.keys(partidas).forEach((minutos) => {
    const partida = partidas[minutos];
    const difPontos = Math.abs(partida.pontos[0] - partida.pontos[1]);
    const vencedorIndex = partida.pontos[0] > partida.pontos[1] ? 0 : 1;

    if (difPontos >= diferenca) {
      result.push({
        minutos,
        jogoID: partida.jogoID,
        difPontos,
        timeWin: vencedorIndex === 0 ? partida.time1.nome : partida.time2.nome,
        tempo: partida.tempo,
      });
    }
  });

  return result.length === 0 ? false : result;
}

export default DiffPoints;
