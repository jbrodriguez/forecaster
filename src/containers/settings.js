// @flow

import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import type { Dispatch } from 'redux'
import { connect } from 'react-redux'
import SettingsList from 'react-native-settings-list'
import { NavigationActions } from 'react-navigation'

import type { TAppState, TGui, TTempUnit } from '../typings'
import { getGui, getVersion } from '../modules/env'
import { tempUnits, getTempUnit } from '../modules/settings'

type Props = {
  gui: TGui,
  version: string,
  tempUnit: TTempUnit,
  dispatch: Dispatch,
}

class Settings extends PureComponent<Props> {
  static navigationOptions = {
    title: 'Settings',
  }

  onTemp = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'TempUnit' }))
  }

  render() {
    const { gui: { s, c }, tempUnit, version } = this.props

    return (
      <View style={[s.flx_i, s.pa2, c.g_background]}>
        <View style={[s.flx_row, s.aic, s.mb3]}>
          <Text style={[s.f5, c.c_primary]}>Forecaster version:</Text>
          <Text style={[s.ml2, s.f5, c.c_accent]}>{version}</Text>
        </View>

        <SettingsList backgroundColor={c.background} borderColor={c.divider} defaultTitleStyle={[s.f5, c.c_accent]}>
          <SettingsList.Item
            title="Temperature Unit"
            titleInfo={tempUnits[tempUnit].label}
            titleInfoStyle={[s.f5, c.c_primary]}
            onPress={this.onTemp}
          />
        </SettingsList>
      </View>
    )
  }
}

const mapStateToProps = (state: TAppState) => ({
  gui: getGui(state),
  version: getVersion(state),
  tempUnit: getTempUnit(state),
})
const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
