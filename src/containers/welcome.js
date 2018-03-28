// @flow

import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import { connect } from 'react-redux'

import type { TGui } from '../typings'
import { getGui } from '../modules/env'

type Props = {
  gui: TGui,
}

class Welcome extends PureComponent<Props> {
  static navigationOptions = {
    header: null,
  }

  render() {
    const { gui: { s, c } } = this.props

    return (
      <View style={[s.flx_i, s.jcc, c.g_background]}>
        <Text style={[s.f2, s.mb3, s.tc, c.c_accent]}> Welcome to Forecaster </Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  gui: getGui(state),
})

export default connect(mapStateToProps)(Welcome)
