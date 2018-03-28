// @flow

import React, { PureComponent } from 'react'

import { Provider } from 'react-redux'

import configureStore from './store'
import App from './containers/app'

import type { TStore } from './typings'

import { start } from './modules/env'

export default class Root extends PureComponent<{}> {
  store: TStore

  // create the redux store, the callback will be invoked when redux-persist has rehydrated
  // the store from AsyncStorage
  constructor() {
    super()
    this.store = configureStore(this.hydrated)
  }

  // dispatch the start action, which is handled by the env.start saga
  hydrated = () => {
    this.store.dispatch(start())
  }

  render() {
    return (
      <Provider store={this.store}>
        <App />
      </Provider>
    )
  }
}
