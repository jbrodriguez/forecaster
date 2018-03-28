// @flow

import { StyleSheet } from 'react-native'

import { takeLatest, put, select } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import Tachyons from 'react-native-style-tachyons'

import ActionKey from '../typings'
import type { TAppState, TEnvState, AOther, AStart, ASetup, TSetup, TGui } from '../typings'
import colors from '../colors'

// ACTION CREATORS
export const start = (): AStart => ({ type: ActionKey.START })
export const setup = (payload: TSetup): ASetup => ({ type: ActionKey.SETUP, payload })

Tachyons.build({ rem: 16 }, StyleSheet)

// REDUCER
const initialState: TEnvState = {
  loaded: false,
  version: '1.0.0',
  gui: { s: Tachyons.styles, c: colors, z: Tachyons.sizes },
}

type TAction = AOther | ASetup

const reducer = (state: TEnvState = initialState, action: TAction): TEnvState => {
  switch (action.type) {
    case ActionKey.SETUP:
      return {
        ...state,
        version: action.payload.version,
        loaded: true,
      }

    default:
      return state
  }
}

export default reducer

// SELECTORS
export const getLoaded = (state: TAppState): boolean => state.env.loaded
export const getGui = (state: TAppState): TGui => state.env.gui

// SAGAS
const SStart = function* GSStart() {
  // // get binary version info from the device itself ...
  // let version = DeviceInfo.getVersion()
  // if (codePushUpdateMetadata) {
  //  // ... but update it from codePush if available
  //  version = codePushUpdateMetadata.description
  // }
  const version = '1.0.0'

  yield put(setup({ version }))

  const loaded = yield select(getLoaded)
  if (loaded) {
    yield put(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
    }))
  }
}

export const sagas = {
  start: takeLatest(ActionKey.START, SStart),
}
