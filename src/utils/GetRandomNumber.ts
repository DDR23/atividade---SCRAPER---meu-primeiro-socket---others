export function GetRandomNumber(minimo: number, maximo: number) {
  return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}
