// @flow

import React, { PureComponent } from 'react'
import { ScrollView, View, RefreshControl, Platform, Text } from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import type { TGui, TAppState, TCity } from '../typings'
import { getCurrent } from '../modules/model'
import { getGui, isRefreshing } from '../modules/env'

import Gauge from '../components/gauge'

type Props = {
  gui: TGui,
  city: TCity,
  refreshing: boolean,
}

class City extends PureComponent<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
  })

  onRefresh = () => {}

  render() {
    const { gui: { s, c }, refreshing, city } = this.props

    const bgStyle = Platform.OS === 'ios' ? c.g_transparent : null

    return (
      <ScrollView
        style={c.g_background}
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
      >
        <View style={[s.jcsb, s.pa2]}>
          <View style={[s.flx_row, s.aic, s.jcsb]}>
            <Gauge
              gui={this.props.gui}
              measure={{ value: city.main.temp_min.toString(), unit: 'S' }}
              caption="min temp."
            />

            <Gauge
              gui={this.props.gui}
              measure={{ value: city.main.temp.toString(), unit: '℃' }}
              caption="TEMPERATURE"
              hero
            />

            <Gauge
              gui={this.props.gui}
              measure={{ value: city.main.temp_max.toString(), unit: 'S' }}
              caption="max temp."
            />
          </View>

          <View style={[s.flx_row, s.aic, s.jcsb, s.mt3]}>
            <View style={[s.flx_row, s.aic]}>
              <Text style={[s.tl, s.f6, c.c_bgTone1]}>PRESSURE: </Text>
              <Text style={[s.tl, s.f6, c.c_muted]}>{city.main.pressure}</Text>
            </View>
            <View style={[s.flx_row, s.aic]}>
              <Text style={[s.tc, s.f6, c.c_bgTone1]}>HUMIDITY: </Text>
              <Text style={[s.tc, s.f6, c.c_muted]}>{city.main.humidity}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state: TAppState) => ({
  city: getCurrent(state),
  gui: getGui(state),
  refreshing: isRefreshing(state),
})
// const mapDispatchToProps = dispatch => bindActionCreators({ bgRefresh }, dispatch)

export default connect(mapStateToProps)(City)
// export default connect(mapStateToProps, mapDispatchToProps)(City)
