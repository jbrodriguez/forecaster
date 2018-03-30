import 'react-native'

import { expectSaga } from 'redux-saga-test-plan'

import env, { SStart, setup, initialState, setRefreshing, setSearching, setPotentials } from '../../src/modules/env'
import { addCity } from '../../src/modules/model'

describe('env/sagas', () => {
  it('SStart/puts setup & navigation reset', () =>
    expectSaga(SStart)
      .put(setup({ version: '1.0.0' }))
      .put({
        type: 'Navigation/RESET',
        index: 0,
        key: undefined,
        actions: [{ type: 'Navigation/NAVIGATE', routeName: 'Cities' }],
      })
      .run())
})

describe('env/reducer', () => {
  test('return the same state on unhandled action', () => {
    expect(env(initialState, { type: '_NULL_' })).toMatchSnapshot()
  })

  test('handles setup', () => {
    expect(env(initialState, setup({ version: '2.0.0' }))).toMatchSnapshot()
  })

  test('handles setRefreshing', () => {
    expect(env(initialState, setRefreshing(true))).toMatchSnapshot()
  })

  test('handles setSearching', () => {
    expect(env(initialState, setSearching(true))).toMatchSnapshot()
  })

  test('handles setPotentials', () => {
    expect(env(initialState, setPotentials([]))).toMatchSnapshot()
  })

  test('handles addCity', () => {
    const city = {
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
      sys: {
        country: 'US',
      },
    }

    expect(env(initialState, addCity(city))).toMatchSnapshot()
  })
})

describe('settings/action creators', () => {
  test('creates setup', () => {
    expect(setup('3.0.0')).toMatchSnapshot()
  })

  test('creates setRefreshing', () => {
    expect(setRefreshing(false)).toMatchSnapshot()
  })

  test('creates setSearching', () => {
    expect(setSearching(false)).toMatchSnapshot()
  })

  test('creates setPotentials', () => {
    expect(setPotentials([])).toMatchSnapshot()
  })
})
