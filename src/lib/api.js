// @flow

import { encode } from './utils'
import getCityData from './getCityData'

// TODO: need to securely handle the key
const apiKey = ''
const lookupUrl = 'https://api.openweathermap.org/data/2.5/find?'
const getUrl = 'https://api.openweathermap.org/data/2.5/weather?'

function CodeException(message, code) {
  this.name = 'CodeException'
  this.code = code
  this.message = message
}

const checkStatus = (response) => {
  switch (response.status) {
    case 200:
      return response.json()

    case 400:
      return { list: [] } // the api uses 400 to signifiy "Nothing to geocode"

    default:
      throw new CodeException('Network error', response.status) // TODO: return error message from api
  }
}

const raiseException = exception => ({ data: null, err: { err_code: exception.code, err_msg: exception.message } })

const lookupCity = (name: string) => {
  // const params = encode({
  //   q: name,
  //   appid: apiKey,
  // })

  // const ep = `${lookupUrl}${params}`

  // return fetch(ep)
  //   .then(checkStatus)
  //   .then(data => ({ data, err: null }))
  //   .catch(raiseException)

  // return { data: lookupCitiData, err: null }
}

const getCity = (id: number) => {
  // const params = encode({
  //   id: id.toString(),
  //   appid: apiKey,
  // })

  // const ep = `${getUrl}${params}`

  // return fetch(ep)
  //   .then(checkStatus)
  //   .then(data => ({ data, err: null }))
  //   .catch(raiseException)

  const city = getCityData[id.toString()]
  return { data: city, err: null }
}

export { lookupCity, getCity } // eslint-disable-line import/prefer-default-export
