export const extractDateTime = (str) => {
  const [date, month, year, hour, minute, seconds] = str.split("_");
  return {
    month,
    date,
    year,
    hour,
    minute,
    seconds
  }
}