// @flow

import ActionKey from '../typings'
import type { TModelState, AOther, TAppState, TCity, AAddCity, ASetCurrentCity, ADeleteCity } from '../typings'

// ACTION CREATORS
export const addCity = (payload: TCity): AAddCity => ({ type: ActionKey.ADD_CITY, payload })
export const setCurrentCity = (payload: number): ASetCurrentCity => ({ type: ActionKey.SET_CURRENT_CITY, payload })
export const deleteCity = (payload: number): ADeleteCity => ({ type: ActionKey.DELETE_CITY, payload })

// REDUCER
const initialState: TModelState = {
  cities: {},
  order: [],
  current: 0,
}

type TAction = AOther | AAddCity | ASetCurrentCity | ADeleteCity

const reducer = (state: TModelState = initialState, action: TAction): TModelState => {
  switch (action.type) {
    case ActionKey.ADD_CITY: {
      let cities
      let order

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

    default:
      return state
  }
}

export default reducer

// SELECTORS
export const citiesByOrder = (state: TAppState): TCity[] => state.model.order.map(id => state.model.cities[id])
export const getCurrent = (state: TAppState): TCity => state.model.cities[state.model.current]

// SAGAS
