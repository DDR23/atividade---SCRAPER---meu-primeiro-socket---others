export function getStartAndFinishTimes(configTimeStart: string, configTimeFinish: string) {
  const today = new Date();
  const startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(),
    parseInt(configTimeStart.split(':')[0]), parseInt(configTimeStart.split(':')[1]));
  const finishTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(),
    parseInt(configTimeFinish.split(':')[0]), parseInt(configTimeFinish.split(':')[1]));

  // Verifica se o horário de início é no próximo dia
  if (startTime < today) {
    startTime.setDate(startTime.getDate() + 1);
    finishTime.setDate(finishTime.getDate() + 1);
  }
  return { startTime, finishTime };
}

export function getTimeUntilStart(startTime: Date) {
  const now = Date.now();
  const timeUntilStart = startTime.getTime() - now;
  return timeUntilStart > 0 ? timeUntilStart : 0;
}

export function getTimeRemaining(finishTime: Date) {
  const now = Date.now();
  const timeRemaining = finishTime.getTime() - now;
  return timeRemaining > 0 ? timeRemaining : 0;
}

export function msToSeconds(ms: number) {
  return Math.floor(ms / 1000);
}

export function isWithinTime(startTime: Date, finishTime: Date) {
  const now = Date.now();
  return now >= startTime.getTime() && now <= finishTime.getTime();
}
