// @flow

import React, { PureComponent } from 'react'
import { TouchableOpacity } from 'react-native'

type Props = {
  id: string,
  disabled: boolean,
  children: any,
  goTo: (id: string) => () => void,
}

export default class Touchable extends PureComponent<Props> {
  render() {
    const { id, disabled, children } = this.props

    return (
      <TouchableOpacity onPress={this.props.goTo(id)} disabled={disabled}>
        {children}
      </TouchableOpacity>
    )
  }
}
