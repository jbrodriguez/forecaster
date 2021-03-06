// @flow

import { StyleSheet } from 'react-native'

import type { Saga } from 'redux-saga'
import { takeLatest, put, call } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import Tachyons from 'react-native-style-tachyons'
import pick from 'lodash.pick'
import { DateTime } from 'luxon'

import ActionKey from '../typings'
import type {
  TAppState,
  TEnvState,
  AOther,
  AStart,
  ASetup,
  TSetup,
  TGui,
  ASetRefreshing,
  ALookup,
  ASetSearching,
  TCity,
  ASetPotentials,
  AAddCity,
} from '../typings'
import colors from '../colors'
import { lookupCity } from '../lib/api'

// ACTION CREATORS
export const start = (): AStart => ({ type: ActionKey.START })
export const setup = (payload: TSetup): ASetup => ({ type: ActionKey.SETUP, payload })
export const setRefreshing = (payload: boolean): ASetRefreshing => ({ type: ActionKey.SET_REFRESHING, payload })
export const lookup = (payload: string): ALookup => ({ type: ActionKey.LOOKUP, payload })
export const setSearching = (payload: boolean): ASetSearching => ({ type: ActionKey.SET_SEARCHING, payload })
export const setPotentials = (payload: TCity[]): ASetPotentials => ({ type: ActionKey.SET_POTENTIALS, payload })

Tachyons.build({ rem: 16 }, StyleSheet)

// REDUCER
export const initialState: TEnvState = {
  loaded: false,
  version: '0.0.1',
  gui: { s: Tachyons.styles, c: colors, z: Tachyons.sizes },
  isRefreshing: false, // true when we refresh the main Cities screen or a specific City screen
  isSearching: false, // true when we're looking up cities via the api
  potentials: [], // list of potential cities returned by the api
}

type TAction = AOther | ASetup | ASetRefreshing | ASetSearching | ASetPotentials | AAddCity

const reducer = (state: TEnvState = initialState, action: TAction): TEnvState => {
  switch (action.type) {
    case ActionKey.SETUP:
      return {
        ...state,
        version: action.payload.version,
        loaded: true,
      }

    case ActionKey.SET_REFRESHING:
      return {
        ...state,
        isRefreshing: action.payload,
      }

    case ActionKey.SET_SEARCHING:
      return {
        ...state,
        isSearching: action.payload,
      }

    case ActionKey.SET_POTENTIALS:
      return {
        ...state,
        potentials: action.payload,
      }

    case ActionKey.ADD_CITY:
      return {
        ...state,
        potentials: [],
      }

    default:
      return state
  }
}

export default reducer

// SELECTORS
export const getLoaded = (state: TAppState): boolean => state.env.loaded
export const getGui = (state: TAppState): TGui => state.env.gui
export const isRefreshing = (state: TAppState): boolean => state.env.isRefreshing
export const isSearching = (state: TAppState): boolean => state.env.isSearching
export const getPotentials = (state: TAppState): TCity[] => state.env.potentials
export const getVersion = (state: TAppState): string => state.env.version

// SAGAS
export const SStart = function* GSStart(): Saga<void> {
  // // get binary version info from the device itself ...
  // let version = DeviceInfo.getVersion()
  // if (codePushUpdateMetadata) {
  //  // ... but update it from codePush if available
  //  version = codePushUpdateMetadata.description
  // }
  const version = '1.0.0'
  yield put(setup({ version }))

  yield put(
    NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Cities' })],
    }),
  )
}

// This handles the debounced input from the user, when searching for a city name in the Search screen
const SLookup = function* GLookup(action: ALookup) {
  const name = action.payload

  yield put(setSearching(true))

  // I get back a { data, err } object
  const results = yield call(lookupCity, name)
  if (results.err) {
    // TODO: handle error here, set an error prop to show a toast
    yield put(setSearching(false))
    return
  }

  const now = DateTime.local()
  const tz = now.zoneName
  const timestamp = Math.round(now.valueOf() / 1000)

  // results.data is the reply from the api
  // results.data.list has the cities that match based on user input, let's pick only the fields we really need
  // this also handles the case where the api returns an empty list
  const potentials = results.data.list.map(city => {
    const { id, ...rest } = pick(city, ['id', 'name', 'coord', 'main', 'sys'])
    return { id: id.toString(), ...rest, timestamp, timeZoneId: tz }
  })

  yield put(setPotentials(potentials))
  yield put(setSearching(false))
}

export const sagas = {
  start: takeLatest(ActionKey.START, SStart),
  lookup: takeLatest(ActionKey.LOOKUP, SLookup),
}
