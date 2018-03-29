// @flow

import { encode } from './utils'

// TODO: need to securely handle the key
const apiKey = ''
const lookupUrl = 'https://api.openweathermap.org/data/2.5/find?'
// const locateEp = 'https://api.openweathermap.org/data/2.5/weather?'

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

  const data = {
    message: 'accurate',
    cod: '200',
    count: 5,
    list: [
      {
        id: 4246595,
        name: 'Pana',
        coord: {
          lat: 39.3889,
          lon: -89.0801,
        },
        main: {
          temp: 283.2,
          pressure: 1013,
          humidity: 87,
          temp_min: 282.15,
          temp_max: 284.15,
        },
        dt: 1522269300,
        wind: {
          speed: 2.01,
          deg: 290.509,
        },
        sys: {
          country: 'US',
        },
        rain: null,
        snow: null,
        clouds: {
          all: 90,
        },
        weather: [
          {
            id: 721,
            main: 'Haze',
            description: 'haze',
            icon: '50d',
          },
          {
            id: 301,
            main: 'Drizzle',
            description: 'drizzle',
            icon: '09d',
          },
          {
            id: 701,
            main: 'Mist',
            description: 'mist',
            icon: '50d',
          },
        ],
      },
      {
        id: 1663526,
        name: 'Pana',
        coord: {
          lat: 20.4448,
          lon: 100.3776,
        },
        main: {
          temp: 291.192,
          pressure: 958.53,
          humidity: 94,
          temp_min: 291.192,
          temp_max: 291.192,
          sea_level: 1022.33,
          grnd_level: 958.53,
        },
        dt: 1522271338,
        wind: {
          speed: 1.31,
          deg: 42.0092,
        },
        sys: {
          country: 'LA',
        },
        rain: null,
        snow: null,
        clouds: {
          all: 0,
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'Sky is Clear',
            icon: '01n',
          },
        ],
      },
      {
        id: 1636045,
        name: 'Pana',
        coord: {
          lat: -3.2905,
          lon: 119.8371,
        },
        main: {
          temp: 290.392,
          pressure: 922.7,
          humidity: 100,
          temp_min: 290.392,
          temp_max: 290.392,
          sea_level: 1021.96,
          grnd_level: 922.7,
        },
        dt: 1522271338,
        wind: {
          speed: 1.31,
          deg: 277.009,
        },
        sys: {
          country: 'ID',
        },
        rain: null,
        snow: null,
        clouds: {
          all: 12,
        },
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02n',
          },
        ],
      },
      {
        id: 2367164,
        name: 'Pana',
        coord: {
          lat: 10.7733,
          lon: 0.2917,
        },
        main: {
          temp: 300.742,
          pressure: 990.71,
          humidity: 27,
          temp_min: 300.742,
          temp_max: 300.742,
          sea_level: 1019.98,
          grnd_level: 990.71,
        },
        dt: 1522271339,
        wind: {
          speed: 2.81,
          deg: 35.0092,
        },
        sys: {
          country: 'TG',
        },
        rain: null,
        snow: null,
        clouds: {
          all: 20,
        },
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02n',
          },
        ],
      },
      {
        id: 3925955,
        name: 'Pana',
        coord: {
          lat: -15.8946,
          lon: -71.0645,
        },
        main: {
          temp: 284.042,
          pressure: 600.49,
          humidity: 37,
          temp_min: 284.042,
          temp_max: 284.042,
          sea_level: 1016.98,
          grnd_level: 600.49,
        },
        dt: 1522271339,
        wind: {
          speed: 4.66,
          deg: 223.009,
        },
        sys: {
          country: 'PE',
        },
        rain: null,
        snow: null,
        clouds: {
          all: 32,
        },
        weather: [
          {
            id: 802,
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03d',
          },
        ],
      },
    ],
  }
  const err = null

  return { data, err }
}

export { lookupCity } // eslint-disable-line import/prefer-default-export
