// @flow

import ActionKey from '../typings'
import type { TSettingsState, AOther, TAppState, TTempUnit, ASetTempUnit } from '../typings'

// ACTION CREATORS
export const setTempUnit = (payload: TTempUnit): ASetTempUnit => ({ type: ActionKey.SET_TEMP_UNIT, payload })

// REDUCER
export const tempUnits = {
  imperial: { label: 'Fahrenheit', value: 'imperial' },
  metric: { label: 'Celsius', value: 'metric' },
}

const initialState: TSettingsState = {
  tempUnit: 'metric',
}

type TAction = AOther | ASetTempUnit

const reducer = (state: TSettingsState = initialState, action: TAction): TSettingsState => {
  switch (action.type) {
    case ActionKey.SET_TEMP_UNIT:
      return {
        ...state,
        tempUnit: action.payload,
      }

    default:
      return state
  }
}

export default reducer

// SELECTORS
export const getTempUnit = (state: TAppState): TTempUnit => state.settings.tempUnit

// SAGAS
