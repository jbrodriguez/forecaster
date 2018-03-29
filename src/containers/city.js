// @flow

import React, { PureComponent } from 'react'
import { ScrollView, View, RefreshControl, Platform, Text } from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MapView, { Marker } from 'react-native-maps'

import type { TGui, TAppState, TCity, ARefreshCity } from '../typings'
import { getCurrent, refreshCity } from '../modules/model'
import { getGui, isRefreshing } from '../modules/env'

import Gauge from '../components/gauge'

type Props = {
  gui: TGui,
  city: TCity,
  refreshing: boolean,
  refreshCity: (payload: number) => ARefreshCity,
}

class City extends PureComponent<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
  })

  onRefresh = () => {
    const { city } = this.props
    this.props.refreshCity(city.id)
  }

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
              <Text style={[s.tl, s.f5, c.c_muted]}>{city.main.pressure}</Text>
              <Text style={[s.tl, s.f6, c.c_primary]}> mb</Text>
            </View>
            <View style={[s.flx_row, s.aic]}>
              <Text style={[s.tc, s.f6, c.c_bgTone1]}>HUMIDITY: </Text>
              <Text style={[s.tc, s.f5, c.c_muted]}>{city.main.humidity}</Text>
              <Text style={[s.tl, s.f6, c.c_primary]}> %</Text>
            </View>
          </View>

          <MapView
            style={[s.mt2, { height: 250 }]}
            region={{
              latitude: city.coord.lat,
              longitude: city.coord.lon,
              latitudeDelta: 0.25,
              longitudeDelta: 0.25,
            }}
          >
            <Marker
              coordinate={{ latitude: city.coord.lat, longitude: city.coord.lon }}
              title={city.name}
              description={city.sys.country}
            />
          </MapView>
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
const mapDispatchToProps = dispatch => bindActionCreators({ refreshCity }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(City)
