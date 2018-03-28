// @flow

import type { Store as ReduxStore } from 'redux'
import { NavigationState } from 'react-navigation'

// ACTION TYPE KEYS
const ActionKey = {
  OTHER: '__other__',
  START: 'forecaster/env/START',
  SETUP: 'forecaster/env/SETUP',
}

export default ActionKey

// TYPES
export type TStyle = { [key: string]: any } | number | false | null | void | Array<TStyle>

export type TSetup = {
  version: string,
}

export type TGui = {
  s: any,
  c: any,
  z: any,
}

// STORE / STATE
export type TEnvState = {
  loaded: boolean,
  version: string,
  gui: TGui,
}

export type TAppState = {
  env: TEnvState,
  nav: NavigationState,
}

export type TStore = ReduxStore<TAppState>

// ACTION CREATORS
export type AOther = {
  +type: typeof ActionKey.OTHER,
}

export type AStart = {
  +type: typeof ActionKey.START,
}

export type ASetup = {
  +type: typeof ActionKey.SETUP,
  payload: TSetup,
}
