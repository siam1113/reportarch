export const extractMetaInfo = (str) => {
  const [reportname, client, date, month, year, hour, minute, seconds] = str.split("_");
  return {
    reportname,
    client,
    month,
    date,
    year,
    hour,
    minute,
    seconds
  }
}