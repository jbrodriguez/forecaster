// @flow

import type { TCoord } from '../typings'
import { encode } from './utils'
// import getCityData from './getCityData'
// import lookupCityData from './lookupCitiData'

// TODO: need to securely handle the key
const apiKey = 'b20d1d6a3b21c464c97f24de370a9a01'
const timeKey = 'AIzaSyC8gP2BtqjlR4mVCwY8MgPh7U02av2sjdY'

const lookupUrl = 'https://api.openweathermap.org/data/2.5/find?'
const getUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const timeUrl = 'https://maps.googleapis.com/maps/api/timezone/json?'

function CodeException(message, code) {
  this.name = 'CodeException'
  this.code = code
  this.message = message
}

const checkStatus = response => {
  switch (response.status) {
    case 200:
      return response.json()

    case 400:
      return { list: [] } // the api uses 400 to signifiy "Nothing to geocode"

    default:
      throw new CodeException('Network error', response.status) // TODO: return error message from api
  }
}

const checkTimeStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  }

  throw new CodeException('Network error', response.status) // TODO: return error message from api
}

const raiseException = exception => ({ data: null, err: { err_code: exception.code, err_msg: exception.message } })

const lookupCity = (name: string) => {
  const params = encode({
    q: name,
    appid: apiKey,
  })

  const ep = `${lookupUrl}${params}`

  return fetch(ep)
    .then(checkStatus)
    .then(data => ({ data, err: null }))
    .catch(raiseException)

  // return { data: lookupCitiData, err: null }
}

const getCity = (id: string) => {
  const params = encode({
    id,
    appid: apiKey,
  })

  const ep = `${getUrl}${params}`

  return fetch(ep)
    .then(checkStatus)
    .then(data => ({ data, err: null }))
    .catch(raiseException)

  // const city = getCityData[id.toString()]
  // return { data: city, err: null }
}

const getTime = (coord: TCoord) => {
  const now = Math.round(new Date().getTime() / 1000)

  const params = encode({
    location: `${coord.lat},${coord.lon}`,
    timestamp: `${now}`,
    key: timeKey,
  })

  const ep = `${timeUrl}${params}`

  return fetch(ep)
    .then(checkTimeStatus)
    .then(data => ({ data: { ...data, now }, err: null }))
    .catch(raiseException)
}

export { lookupCity, getCity, getTime } // eslint-disable-line import/prefer-default-export
