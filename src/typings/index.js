// @flow

import type { Store as ReduxStore } from 'redux'
import { NavigationState } from 'react-navigation'

// ACTION TYPE KEYS
const ActionKey = {
  OTHER: '__other__',

  START: 'forecaster/env/START',
  SETUP: 'forecaster/env/SETUP',
  SET_REFRESHING: 'forecaster/env/SET_REFRESHING',
  LOOKUP: 'forecaster/env/LOOKUP',
  SET_SEARCHING: 'forecaster/env/SET_SEARCHING',
  SET_POTENTIALS: 'forecaster/env/SET_POTENTIALS',

  ADD_CITY: 'forecaster/model/ADD_CITY',
  SET_CURRENT_CITY: 'forecaster/model/SET_CURRENT_CITY',
  DELETE_CITY: 'forecaster/model/DELETE_CITY',
  REFRESH_ALL: 'forecaster/model/REFRESH_ALL',
  SET_CITY: 'forecaster/model/SET_CITY',
  REFRESH_CITY: 'forecaster/model/REFRESH_CITY',

  SET_TEMP_UNIT: 'forecaster/settings/SET_TEMP_UNIT',
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

export type TCoord = {
  lat: number,
  lon: number,
}

export type TMain = {
  temp: number,
  pressure: number,
  humidity: number,
  temp_min: number,
  temp_max: number,
}

export type TSys = {
  type: number,
  id: number,
  message: number,
  country: string,
  sunrise: number,
  sunset: number,
}

export type TCity = {
  id: string,
  name: string,
  coord: TCoord,
  main: TMain,
  sys: TSys,
}

export type TCities = {
  [id: string]: TCity,
}

export type TMeasure = {
  value: string,
  unit: string,
}

export type TSetCityArg = {
  id: string,
  city: TCity,
}

export type TTempUnit = 'imperial' | 'metric'

// STORE / STATE
export type TEnvState = {
  loaded: boolean,
  version: string,
  gui: TGui,
  isRefreshing: boolean,
  isSearching: boolean,
  potentials: TCity[],
}

export type TModelState = {
  cities: TCities | {},
  order: string[],
  current: string,
}

export type TSettingsState = {
  tempUnit: TTempUnit,
}

export type TAppState = {
  env: TEnvState,
  nav: NavigationState,
  model: TModelState,
  settings: TSettingsState,
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

export type ASetRefreshing = {
  +type: typeof ActionKey.SET_REFRESHING,
  payload: boolean,
}

export type ALookup = {
  +type: typeof ActionKey.LOOKUP,
  payload: string,
}

export type ASetSearching = {
  +type: typeof ActionKey.SET_SEARCHING,
  payload: boolean,
}

export type ASetPotentials = {
  +type: typeof ActionKey.SET_POTENTIALS,
  payload: TCity[],
}

export type AAddCity = {
  +type: typeof ActionKey.ADD_CITY,
  payload: TCity,
}

export type ASetCurrentCity = {
  +type: typeof ActionKey.SET_CURRENT_CITY,
  payload: string,
}

export type ADeleteCity = {
  +type: typeof ActionKey.DELETE_CITY,
  payload: string,
}

export type ARefreshAll = {
  +type: typeof ActionKey.REFRESH_ALL,
}

export type ASetCity = {
  +type: typeof ActionKey.SET_CITY,
  payload: TSetCityArg,
}

export type ARefreshCity = {
  +type: typeof ActionKey.REFRESH_CITY,
  payload: string,
}

export type ASetTempUnit = {
  +type: typeof ActionKey.SET_TEMP_UNIT,
  payload: TTempUnit,
}
