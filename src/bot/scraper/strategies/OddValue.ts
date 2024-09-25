export function OddValue(partidas: any, valorMaximo: number) {
  let result: any[] = [];

  Object.keys(partidas).forEach((minutos) => {
    const partida = partidas[minutos];
    const timeMenorOdd = partida.time1.odd < partida.time2.odd ? partida.time1 : partida.time2;

    if (timeMenorOdd.odd <= valorMaximo) {
      result.push({
        minutos,
        jogoID: partida.jogoID,
        timeWin: timeMenorOdd.nome,
        odd: timeMenorOdd.odd,
        tempo: partida.tempo,
      });
    }
  });

  return result.length === 0 ? false : result;
}

export default OddValue;
