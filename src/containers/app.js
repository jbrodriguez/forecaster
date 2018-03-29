// @flow

import React, { PureComponent } from 'react'
import { View, StatusBar, BackHandler } from 'react-native'

import type { Dispatch } from 'redux'
import { connect } from 'react-redux'
import {
  addNavigationHelpers,
  StackNavigator,
  // NavigationDispatch,
  NavigationActions,
  NavigationState,
} from 'react-navigation'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'

import type { TAppState, TGui } from '../typings'
import { getNav } from '../modules/nav'
import { getGui } from '../modules/env'

import NavBar from './navbar'
import Loading from './loading'
import Cities from './cities'
import Search from './search'
import Welcome from './welcome'
import City from './city'

export const Navigator = StackNavigator(
  {
    Loading: { screen: Loading },
    Cities: { screen: Cities },
    Search: { screen: Search },
    Welcome: { screen: Welcome },
    City: { screen: City },
  },
  {
    navigationOptions: {
      header: props => <NavBar {...props} />,
    },
  },
)

type Props = {
  nav: NavigationState,
  gui: TGui,
  dispatch: Dispatch,
}

type State = {
  addListener: any,
}

class App extends PureComponent<Props, State> {
  state: State = {
    addListener: createReduxBoundAddListener('root'),
  }

  onBackPress = () => {
    const { nav } = this.props
    if (nav.index === 0) {
      return false
    }

    this.props.dispatch(NavigationActions.back())
    return true
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  render() {
    const { s, c } = this.props.gui

    const barStyle = 'light-content'

    const navigation = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
      addListener: this.state.addListener,
    })

    // <StatusBar> here overrides any standard styling set by default by <Navigator>
    return (
      <View style={s.flx_i}>
        <StatusBar backgroundColor={c.background} barStyle={barStyle} />
        <Navigator navigation={navigation} />
      </View>
    )
  }
}

const mapStateToProps = (state: TAppState) => ({
  nav: getNav(state),
  gui: getGui(state),
})
export default connect(mapStateToProps)(App)
