// @flow

import { takeLatest, put, select, call, fork, all } from 'redux-saga/effects'
import pick from 'lodash.pick'

import ActionKey from '../typings'
import type {
  TModelState,
  AOther,
  TAppState,
  TCity,
  AAddCity,
  ASetCurrentCity,
  ADeleteCity,
  ARefreshAll,
  TSetCityArg,
  ASetCity,
  ARefreshCity,
} from '../typings'
import { getCity } from '../lib/api'

// ACTION CREATORS

export const addCity = (payload: TCity): AAddCity => ({ type: ActionKey.ADD_CITY, payload })
export const setCurrentCity = (payload: number): ASetCurrentCity => ({ type: ActionKey.SET_CURRENT_CITY, payload })
export const deleteCity = (payload: number): ADeleteCity => ({ type: ActionKey.DELETE_CITY, payload })
export const refreshAll = (): ARefreshAll => ({ type: ActionKey.REFRESH_ALL })
export const setCity = (payload: TSetCityArg): ASetCity => ({ type: ActionKey.SET_CITY, payload })
export const refreshCity = (payload: number): ARefreshCity => ({ type: ActionKey.REFRESH_CITY, payload })

// REDUCER
const initialState: TModelState = {
  cities: {},
  order: [],
  current: 0,
}

type TAction = AOther | AAddCity | ASetCurrentCity | ADeleteCity | ASetCity

const reducer = (state: TModelState = initialState, action: TAction): TModelState => {
  switch (action.type) {
    case ActionKey.ADD_CITY: {
      let cities
      let order

      // it the city is already present, let's just do a 'refresh'
      if (state.cities[action.payload.id.toString()]) {
        return {
          ...state,
          cities: {
            ...state.cities,
            [action.payload.id.toString()]: action.payload,
          },
        }
      }

      if (state.order.length === 5) {
        // get id of the first city (fir element of the array)
        const id = state.order[0]

        // remove first element of the array and push added city's id to the back
        order = [...state.order.slice(1), action.payload.id]

        // remove id from the cities map
        const key = id.toString()
        const { [key]: value, ...other } = state.cities

        // add city to the map
        cities = { ...other, [action.payload.id.toString()]: action.payload }
      } else {
        order = [...state.order, action.payload.id]
        cities = { ...state.cities, [action.payload.id.toString()]: action.payload }
      }

      const current = action.payload.id

      return {
        ...state,
        cities,
        order,
        current,
      }
    }

    case ActionKey.SET_CURRENT_CITY:
      return {
        ...state,
        current: action.payload,
      }

    case ActionKey.DELETE_CITY: {
      const id = action.payload

      const index = state.order.findIndex(cityId => cityId === id)
      const order = [...state.order.slice(0, index), ...state.order.slice(index + 1)]

      // remove id from the cities map
      const key = id.toString()
      const { [key]: value, ...other } = state.cities

      // return cities without the id
      const cities = { ...other }

      return {
        ...state,
        order,
        cities,
        current: 0,
      }
    }

    case ActionKey.SET_CITY:
      return {
        ...state,
        cities: {
          ...state.cities,
          [action.payload.id.toString()]: action.payload.city,
        },
      }

    default:
      return state
  }
}

export default reducer

// SELECTORS
export const citiesByOrder = (state: TAppState): TCity[] => state.model.order.map(id => state.model.cities[id])
export const getCurrent = (state: TAppState): TCity => state.model.cities[state.model.current.toString()]
export const getIds = (state: TAppState): number[] => state.model.order

// SAGAS
function* refreshOne(id: number) {
  const result = yield call(getCity, id)
  if (result.err) {
    // TODO: handle error here, set an error prop to show a toast
    // yield put(setRefreshing(false))
    return
  }

  const city = pick(result.data, ['id', 'name', 'coord', 'main', 'sys'])

  yield put(setCity({ id, city }))
}

// Refresh data for one city (this is usually called from the City screen)
const SRefreshCity = function* GRefreshCity(action: ARefreshCity) {
  const id = action.payload
  yield call(refreshOne, id)
}

// Refresh data for all the cities (this is usually called from the Cities screen)
const SRefreshAll = function* GRefreshAll() {
  const cityIds = yield select(getIds)

  const calls = cityIds.map(id => fork(refreshOne, id))

  yield all(calls)
}

export const sagas = {
  refreshAll: takeLatest(ActionKey.REFRESH_ALL, SRefreshAll),
  refreshCity: takeLatest(ActionKey.REFRESH_CITY, SRefreshCity),
}
