// @flow

import ActionKey from '../typings'
import type { TModelState, AOther, TAppState, TCity, AAddCity } from '../typings'

// ACTION CREATORS
export const addCity = (payload: TCity): AAddCity => ({ type: ActionKey.ADD_CITY, payload })

// REDUCER
const initialState: TModelState = {
  cities: {},
  order: [],
  current: 0,
}

type TAction = AOther | AAddCity

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
        const { [id]: value, ...other } = state.cities

        // add city to the map
        cities = { ...other, [action.payload.id]: action.payload }
      } else {
        order = [...state.order, action.payload.id]
        cities = { ...state.cities, [action.payload.id]: action.payload }
      }

      const current = action.payload.id

      return {
        ...state,
        cities,
        order,
        current,
      }
    }

    default:
      return state
  }
}

export default reducer

// SELECTORS
export const citiesByOrder = (state: TAppState): TCity[] => state.model.order.map(id => state.model.cities[id])

// SAGAS
