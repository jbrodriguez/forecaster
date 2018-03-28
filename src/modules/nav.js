// @flow

import { NavigationActions, NavigationState } from 'react-navigation'

import type { TAppState } from '../typings'
import { Navigator } from '../containers/app'

// ACTION TYPES

// ACTION CREATORS

// REDUCERS
const initialState: NavigationState = Navigator.router.getStateForAction(
  Navigator.router.getActionForPathAndParams('Loading'),
  null,
)

type TAction = {
  +type: string,
}

const reducer = (state: NavigationState = initialState, action: TAction) => {
  let nextState

  switch (action.type) {
    case 'Loading':
      nextState = Navigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Loading' }), state)
      break
    case 'Welcome':
      nextState = Navigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
        }),
        state,
      )
      break
    default:
      nextState = Navigator.router.getStateForAction(action, state)
      break
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state
}

export default reducer

/* SELECTORS */
export const getNav = (state: TAppState): NavigationState => state.nav

/* SAGAS */
