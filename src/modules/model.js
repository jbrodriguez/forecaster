// @flow

import type { TModelState, AOther, TAppState, TCity } from '../typings'

// ACTION CREATORS

// REDUCER
const initialState: TModelState = {
  cities: {},
  order: [],
}

type TAction = AOther

const reducer = (state: TModelState = initialState, action: TAction): TModelState => {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer

// SELECTORS
export const citiesByOrder = (state: TAppState): TCity[] => state.model.order.map(id => state.model.cities[id])

// SAGAS
