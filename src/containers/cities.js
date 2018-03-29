// @flow

import React, { PureComponent } from 'react'
import { View, TouchableOpacity, Text, RefreshControl, Platform } from 'react-native'

import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { SwipeListView } from 'react-native-swipe-list-view'

import type { TCity, TGui, ASetRefreshing, ASetCurrentCity, ADeleteCity, ARefreshAll } from '../typings'
import { getGui, isRefreshing } from '../modules/env'
import { citiesByOrder, setCurrentCity, deleteCity, refreshAll } from '../modules/model'

import HeaderRight from './cities.header'
import CityProxy from '../components/cityProxy'

type Props = {
  cities: TCity[],
  gui: TGui,
  refreshing: boolean,
  setRefreshing: (payload: boolean) => ASetRefreshing,
  setCurrentCity: (payload: number) => ASetCurrentCity,
  deleteCity: (payload: number) => ADeleteCity,
  refreshAll: () => ARefreshAll,
  dispatch: Dispatch,
}

class Cities extends PureComponent<Props> {
  static navigationOptions = {
    title: 'Cities',
    headerRight: <HeaderRight />,
  }

  componentDidMount() {
    // this.props.refresh()
  }

  onRefresh = () => {
    this.props.refreshAll()
  }

  onDelete = (id: number, row) => () => {
    row.closeRow()
    this.props.deleteCity(id)
  }

  goTo = (id: number) => () => {
    const { cities } = this.props

    const city = cities.find(item => item.id === id)

    // this shouldn't happen, since we're selecting an item from the cities array
    if (!city) {
      return
    }

    this.props.setCurrentCity(id)
    this.props.dispatch(NavigationActions.navigate({ routeName: 'City', params: { title: city.name } }))
  }

  renderRow = data => <CityProxy gui={this.props.gui} city={data.item} goTo={this.goTo} />

  renderHidden = (data, rowMap) => {
    const { gui: { s, c } } = this.props
    const row = rowMap[data.item.id.toString()]
    return (
      <View style={[s.flx_i, s.flx_row, s.aic, s.jcsb, c.g_background]}>
        <TouchableOpacity
          style={[
            s.aic,
            s.jcc,
            {
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: 75,
            },
            c.g_alert,
          ]}
          onPress={this.onDelete(data.item.id, row)}
        >
          <Text style={[s.f5, c.c_white]}>Delete</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { cities, gui: { s, c }, refreshing } = this.props

    const bgStyle = Platform.OS === 'ios' ? c.g_transparent : null

    if (cities.length === 0) {
      return (
        <View style={[s.flx_i, s.pt4, c.g_background]}>
          <Text style={[s.f4, s.tc, c.c_secondary]}>Add a city using the plus icon on the top right</Text>
        </View>
      )
    }

    return (
      <View style={[s.flx_i, c.g_background]}>
        <SwipeListView
          useFlatList
          data={cities}
          keyExtractor={item => item.id.toString()}
          renderItem={this.renderRow}
          renderHiddenItem={this.renderHidden}
          refreshControl={
            <RefreshControl
              style={bgStyle}
              refreshing={refreshing}
              onRefresh={this.onRefresh}
              tintColor={c.accent}
              title="Refreshing ..."
              titleColor={c.accent}
              colors={[c.accent]}
              progressBackgroundColor={c.primary}
            />
          }
          recalculateHiddenLayout
          leftOpenValue={75}
          disableLeftSwipe
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  cities: citiesByOrder(state),
  gui: getGui(state),
  refreshing: isRefreshing(state),
})
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      setCurrentCity,
      deleteCity,
      refreshAll,
      // setRefreshing,
    },
    dispatch,
  ),
  dispatch,
})

export default connect(mapStateToProps, mapDispatchToProps)(Cities)
