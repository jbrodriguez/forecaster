import 'react-native'
// import React from 'react'

// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer'

import settings, { initialState, setTempUnit } from '../../src/modules/settings'

describe('settings/reducer', () => {
  test('return the same state on unhandled action', () => {
    expect(settings(initialState, { type: '_NULL_' })).toMatchSnapshot()
  })

  test('handles setTempUnit/imperial', () => {
    expect(settings(initialState, setTempUnit('imperial'))).toMatchSnapshot()
  })

  test('handles setTempUnit/metric', () => {
    expect(settings({ ...initialState, tempUnit: 'imperial' }, setTempUnit('metric'))).toMatchSnapshot()
  })
})

describe('settings/action creators', () => {
  test('creates setTempUnit', () => {
    expect(setTempUnit('imperial')).toMatchSnapshot()
  })
})
