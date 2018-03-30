// @flow

import React, { PureComponent } from 'react'
import { Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native'

type Props = {
  id: number,
  disabled: boolean,
  children: any,
  goTo: (id: number) => () => void,
}

// This component uses the Android targeted API for touchables, while being seamless  with iOS
export default class Touchable extends PureComponent<Props> {
  render() {
    const { id, disabled, children } = this.props

    // if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity onPress={this.props.goTo(id)} disabled={disabled}>
        {children}
      </TouchableOpacity>
    )
    // }

    // // Platform.OS === 'android'
    // const API21 = Platform.Version >= 21

    // return (
    //   <TouchableNativeFeedback
    //     onPress={this.props.goTo(id)}
    //     disabled={disabled}
    //     background={
    //       API21
    //         ? TouchableNativeFeedback.SelectableBackgroundBorderless()
    //         : TouchableNativeFeedback.SelectableBackground()
    //     }
    //   >
    //     {children}
    //   </TouchableNativeFeedback>
    // )
  }
}
