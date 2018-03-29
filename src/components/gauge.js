// @flow

import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import type { TGui, TMeasure } from '../typings'

type Props = {
  gui: TGui,
  measure: TMeasure,
  caption: string,
  hero?: boolean,
}

export default class Gauge extends PureComponent<Props> {
  static defaultProps = {
    hero: false,
  }

  render() {
    const {
      gui: { s, c }, measure, caption, hero,
    } = this.props

    let valueS = [s.f4, c.c_secondary]
    let unitS = [s.f5, c.c_primary]
    let captionS = [s.f5, s.tc, c.c_bgTone1]

    if (hero) {
      valueS = [s.f3, c.c_white]
      unitS = [s.f5, c.c_muted]
      captionS = [s.f5, s.tc, c.c_contrast]
    }

    return (
      <View style={s.jcc}>
        <View style={[s.flx_row, s.aic, s.jcc]}>
          <Text style={[...valueS]}>{measure.value}</Text>
          <Text style={[...unitS]}>{measure.unit}</Text>
        </View>
        <View>
          <Text style={[...captionS]}>{caption}</Text>
        </View>
      </View>
    )
  }
}
