// @flow

import React from 'react'

import { connect } from 'react-redux'
import { Header, HeaderProps } from 'react-navigation'

import type { TAppState } from '../typings'
import { getGui } from '../modules/env'

const NavBar = props => <Header {...props} />

const mapStateToProps = (state: TAppState, ownProps: HeaderProps) => ({
  getScreenDetails: (scene) => {
    const details = ownProps.getScreenDetails(scene)
    const { s, c } = getGui(state)

    return {
      ...details,
      options: {
        ...details.options,
        headerStyle: [c.g_background],
        headerTitleStyle: [s.f3, s.normal, c.c_secondary],
        headerBackTitleStyle: [c.c_secondary],
        headerTintColor: [c.secondary],
      },
    }
  },
})

export default connect(mapStateToProps)(NavBar)
