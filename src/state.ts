const serverProtocol = `https`
// const serverAddress = `server-telefon.duckdns.org/` //localhost
const subDomain = `server-telefon`
const domain = `duckdns`
const topDomain = `org`
const serverPort = `4200`
const serverEntry = `api`
// export const baseUrl = `${serverProtocol}://${serverAddress}:${serverPort}/${serverEntry}`;
export const baseUrl = `${serverProtocol}://${subDomain}.${domain}.${topDomain}/${serverEntry}`
