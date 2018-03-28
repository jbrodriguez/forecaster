// @flow

import React, { PureComponent } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

import { connect } from 'react-redux'

import type { TGui } from '../typings'
import { getGui } from '../modules/env'

type Props = {
  gui: TGui,
}

class Loading extends PureComponent<Props> {
  static navigationOptions = {
    header: null,
  }

  render() {
    const { gui: { s, c } } = this.props

    return (
      <View style={[s.flx_i, s.jcsa, s.aic]}>
        <Text style={[s.f5, c.c_primary]}>Loading ...</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  gui: getGui(state),
})
export default connect(mapStateToProps)(Loading)
