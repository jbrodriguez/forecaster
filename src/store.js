// @flow

import { AsyncStorage } from 'react-native'

import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import { persistStore, persistReducer } from 'redux-persist'

import sagas from './sagas'
import type { TStore } from './typings'
import env from './modules/env'
import nav from './modules/nav'
import model from './modules/model'
import settings from './modules/settings'

const reducers = combineReducers({
  env,
  nav,
  model,
  settings,
})

const configureStore = (callback: () => void): TStore => {
  // reducer
  const config = {
    key: 'itcrowd',
    storage: AsyncStorage,
    version: 0,
    throttle: 1000,
    blacklist: ['env', 'nav', 'model'], // temporarily blacklist model for testing purposes
  }

  const reducer = persistReducer(config, reducers)

  // initial state
  const initialState = undefined

  // middleware
  const sagaMiddleware = createSagaMiddleware()
  const navMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav)

  const composeEnhancers = __DEV__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose

  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware), applyMiddleware(navMiddleware))

  // store
  const store: TStore = createStore(reducer, initialState, enhancer)

  // run
  // sagas start listening for actions
  // the redux store is rehydrated from AsyncStorage
  sagaMiddleware.run(sagas)
  persistStore(store, undefined, callback)

  return store
}

export default configureStore
