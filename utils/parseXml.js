export const parseXml = (str) => {
  return new window.DOMParser().parseFromString(str, 'text/xml');
}
