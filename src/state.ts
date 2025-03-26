const serverProtocol = `https`
// const serverAddress = `server-telefon.duckdns.org/` //localhost
const subDomain = `telefonn` //server-telefon
const domain = `duckdns`
const topDomain = `org`
// const serverPort = `4200`
const serverEntry = `api`
// export const baseUrl = `${serverProtocol}://${serverAddress}:${serverPort}/${serverEntry}`;
export const localUrl = `${serverProtocol}://${subDomain}.${domain}.${topDomain}/${serverEntry}`
export const baseUrl =  localUrl//`https://158.160.134.53:4200/api`//`${serverProtocol}://${subDomain}.${domain}.${topDomain}/${serverEntry}` //`http://localhost:4200/api`//

//
export const socketLocal = `https://telefonn.duckdns.org`// `https://server-telefon.duckdns.org`
export const socketEndpoint = socketLocal //`http://158.160.134.53:4200` //`http://localhost:4200`
export const baseAppUrl = `https://telefonn.duckdns.org/a` // `http://localhost:5173/a`