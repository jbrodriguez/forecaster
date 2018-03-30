// @flow

import React, { PureComponent } from 'react'
import { View, TextInput, Text, FlatList, ActivityIndicator } from 'react-native'

import { bindActionCreators } from 'redux'
import type { Dispatch } from 'redux'
import { connect } from 'react-redux'
import debounce from 'lodash.debounce'
import { NavigationActions } from 'react-navigation'

import type { TAppState, TGui, TCity, ALookup, AAddCity } from '../typings'
import { getGui, isSearching, getPotentials, lookup } from '../modules/env'
import { addCity } from '../modules/model'

import Touchable from '../components/touchable'

type Props = {
  gui: TGui,
  searching: boolean,
  potentials: TCity[],
  lookup: (payload: string) => ALookup,
  addCity: (payload: TCity) => AAddCity,
  dispatch: Dispatch,
}

type State = {
  name: string,
}

class Search extends PureComponent<Props, State> {
  static navigationOptions = {
    title: 'Search',
  }

  state = {
    name: '',
  }

  lookup = name => this.props.lookup(name)

  onLocate = debounce(this.lookup, 250)

  onChangeText = value => this.setState({ name: value }, () => this.onLocate(value))

  // add the server to the list, reset search box and navigate to the City screen
  goTo = (id: number) => () => {
    const { potentials } = this.props

    const city = potentials.find(potential => potential.id === id)

    // to silence flow error
    if (!city) {
      return
    }

    this.setState({ name: '' })

    this.props.addCity(city)

    this.props.dispatch(NavigationActions.navigate({ routeName: 'City', params: { title: city.name } }))

    // alternatively we could
    // const resetAction = NavigationActions.reset({
    //   index: 1,
    //   actions: [
    //     NavigationActions.navigate({ routeName: 'Cities' }),
    //     NavigationActions.navigate({ routeName: 'City', params: { title: city.name } }),
    //   ],
    // })
    // this.props.dispatch(resetAction)
  }

  render() {
    const { gui: { s, c }, searching, potentials } = this.props

    return (
      <View style={[s.flx_i, c.g_background]}>
        <View style={[s.flx_row, s.aic, s.pa2, c.g_bgTone2, { borderBottomWidth: 1, borderBottomColor: c.divider }]}>
          <Text style={[c.c_secondary]}>🔍 </Text>
          <TextInput
            style={[s.flx_i, s.f5, c.c_accent, s.pa1, s.ba, { borderColor: c.background }]}
            value={this.state.name}
            onChangeText={this.onChangeText}
            autoCapitalize="none"
            underlineColorAndroid={c.divider}
            placeholder="Enter the City"
            placeholderTextColor={c.secondary}
          />
          {searching && (
            <View style={[s.ml2]}>
              <ActivityIndicator size="small" />
            </View>
          )}
        </View>
        <FlatList
          data={potentials}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Touchable id={item.id} disabled={false} goTo={this.goTo}>
              <View key={item.id} style={[s.pa2, { borderBottomWidth: 1, borderBottomColor: c.divider }]}>
                <Text style={[s.f4, c.c_secondary]}>
                  {item.name}, {item.sys.country}
                </Text>
              </View>
            </Touchable>
          )}
        />
      </View>
    )
  }
}
const mapStateToProps = (state: TAppState) => ({
  gui: getGui(state),
  searching: isSearching(state),
  potentials: getPotentials(state),
})
const mapDispatchToProps = dispatch => ({ ...bindActionCreators({ lookup, addCity }, dispatch), dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(Search)
