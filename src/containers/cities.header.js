// @flow

import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { connect, Dispatch } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import type { TGui } from '../typings'
import { getGui } from '../modules/env'

type Props = {
  gui: TGui,
  search: () => Dispatch<any>,
}

const HeaderRightBase = ({ gui: { s, c }, search }: Props) => (
  <View style={[s.flx_row, s.aic]}>
    <TouchableOpacity onPress={search}>
      <Text style={[s.f2, s.mr2, c.c_secondary]}>+</Text>
    </TouchableOpacity>
  </View>
)

const mapState = state => ({
  gui: getGui(state),
})

const mapDispatch = dispatch => ({
  search: () => dispatch(NavigationActions.navigate({ routeName: 'Search' })),
})

export default connect(mapState, mapDispatch)(HeaderRightBase)