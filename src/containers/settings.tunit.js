// @flow

import React, { PureComponent } from 'react'
import { ScrollView, View, Text, TouchableWithoutFeedback } from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RadioButtons } from 'react-native-radio-buttons'

import type { TAppState, TGui, TTempUnit, ASetTempUnit } from '../typings'
import { getGui } from '../modules/env'
import { tempUnits, getTempUnit, setTempUnit } from '../modules/settings'

const options = Object.keys(tempUnits).map(unit => ({ key: tempUnits[unit].value, label: tempUnits[unit].label }))

type Props = {
  gui: TGui,
  tempUnit: TTempUnit,
  setTempUnit: (payload: TTempUnit) => ASetTempUnit,
}

class TemperatureUnits extends PureComponent<Props> {
  static navigationOptions = {
    title: 'Temperature Unit',
  }

  renderContainer = nodes => <View>{nodes}</View>

  renderOption = (option, selected, onSelect, index) => {
    const { gui: { s, c, z } } = this.props

    // const checkMark = selected ? <Icon name="check" size={z.f4} color={c.altText} /> : null
    const checkMark = selected ? <Text style={[s.f4, c.c_secondary]}>✔︎</Text> : null

    return (
      <TouchableWithoutFeedback onPress={onSelect} key={index}>
        <View style={[s.flx_i, s.flx_row, s.jcsb, s.aic, s.ph3, s.pv2]}>
          <Text style={[s.f4, c.c_primary]}>{option.label}</Text>
          {checkMark}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  equal = (selectedOption, currentOption) => selectedOption.key === currentOption.key

  onSelect = option => this.props.setTempUnit(option.key)

  render() {
    const { gui: { s, c }, tempUnit } = this.props

    const selected = { key: tempUnit, label: tempUnits[tempUnit].label }

    return (
      <ScrollView style={[s.flx_i, c.g_background]}>
        <RadioButtons
          options={options}
          selectedOption={selected}
          onSelection={this.onSelect}
          renderContainer={this.renderContainer}
          renderOption={this.renderOption}
          testOptionEqual={this.equal}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state: TAppState) => ({
  gui: getGui(state),
  tempUnit: getTempUnit(state),
})
const mapDispatchToProps = dispatch => bindActionCreators({ setTempUnit }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TemperatureUnits)
