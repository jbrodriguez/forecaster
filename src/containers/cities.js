// @flow

import React, { PureComponent } from 'react'
import { ListView, View, TouchableOpacity, Text, RefreshControl, Platform } from 'react-native'

// import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'

import type { TCity, TGui, ASetRefreshing } from '../typings'
import { getGui, isRefreshing } from '../modules/env'
import { citiesByOrder } from '../modules/model'
// import { ARefresh, ASetCurrent, ADeleteCity, citiesByOrder, refresh, deleteCity } from '../modules/model'
// import { ARefresh, ASetCurrent, ADeleteCity, citiesByOrder, refresh, deleteCity } from '../modules/model'

import HeaderRight from './cities.header'
import City from './city'

type Props = {
  cities: TCity[],
  gui: TGui,
  refreshing: boolean,
  setRefreshing: (payload: boolean) => ASetRefreshing,
  // refresh: () => ARefresh,
  // setCurrentCity: (payload: string) => ASetCurrent,
  // deleteCity: (payload: string) => ADeleteServer,
  dispatch: Dispatch,
}

class Cities extends PureComponent<Props> {
  static navigationOptions = {
    title: 'Cities',
    headerRight: <HeaderRight />,
  }

  ds: any
  swipeBtn: any
  swipedId: any

  constructor(props) {
    super(props)

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.swipeBtn = null
    this.swipedId = -1
  }

  componentDidMount() {
    // this.props.refresh()
  }

  onRefresh = () => {
    // this.props.refresh()
  }

  onDelete = (id, row) => () => {
    // row.closeRow()
    // this.props.deleteCity(id)
  }

  renderRow = city => <City id={city.id} />

  renderHidden = (city, secId, rowId, rowMap) => {
    const { gui: { s, c } } = this.props
    const row = rowMap[`${secId}${rowId}`]
    return (
      <View style={[s.flx_i, s.flx_row, s.aic, s.jcsb, c.g_transparent]}>
        <TouchableOpacity
          style={[
            s.aic,
            s.jcc,
            {
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: 75,
            },
            c.g_alertBg,
          ]}
          onPress={this.onDelete(city.id, row)}
        >
          <Text style={[s.f5, c.c_white]}>Delete</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { cities, gui: { s, c }, refreshing } = this.props

    const dataSource = this.ds.cloneWithRows(cities)
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
        <ListView
          automaticallyAdjustContentInsets={false}
          dataSource={dataSource}
          renderRow={this.renderRow}
          // ref="listview" // eslint-disable-line
          removeClippedSubviews={false}
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
// const mapDispatchToProps = dispatch => ({
//   ...bindActionCreators(
//     {
//       refresh,
//       setRefreshing,
//       deleteServer,
//     },
//     dispatch,
//   ),
//   dispatch,
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Cities)
export default connect(mapStateToProps)(Cities)
