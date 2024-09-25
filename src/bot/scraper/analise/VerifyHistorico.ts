export default function verifyHistorico(jogoID: string, store: any) {
  const history = store.data.logs;
  const isDuplicate = history.some((item: any) => item.jogoID === jogoID);

  return !isDuplicate;
}
