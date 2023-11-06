export const getFullDateTime = (ts: number) => {
  const timestamp = new Date(ts * 1000);
  const years = timestamp.getFullYear();
  const month = timestamp.getMonth() < 10 ? `0${timestamp.getMonth()}` : timestamp.getMonth();
  const date = +timestamp.getDate() < 10 ? `0${timestamp.getDate()}` : timestamp.getDate();

  return `${years}-${month}-${date}`
}

export const getTimes = (ts: number) => {
  const timestamp = new Date(ts * 1000);

  return `${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`
}