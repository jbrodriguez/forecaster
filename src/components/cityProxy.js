// @flow

import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import type { TGui, TCity } from '../typings'

import Touchable from './touchable'

type Props = {
  gui: TGui,
  city: TCity,
  goTo: (id: number) => () => void,
}

// CitiProxy represents a city in the Cities screen.
// It displays just a summary of the information that a city contains.
export default class CityProxy extends PureComponent<Props> {
  render() {
    const { gui: { s, c }, city } = this.props

    return (
      <Touchable id={city.id} disabled={false} goTo={this.props.goTo}>
        <View
          style={[
            s.flx_row,
            s.jcsb,
            s.aic,
            s.pa2,
            c.g_background,
            { borderBottomWidth: 1, borderBottomColor: c.divider },
          ]}
        >
          <View style={[s.flx_row, s.aic]}>
            <Text style={[s.f4, c.c_accent]}>{city.name} </Text>
            <Text style={[s.f6, c.c_muted]}>({city.sys.country})</Text>
          </View>

          <Text style={[s.tl, s.f6, c.c_muted]}>{city.main.temp}</Text>
        </View>
      </Touchable>
    )
  }
}
