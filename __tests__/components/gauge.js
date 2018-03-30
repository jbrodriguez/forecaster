import { StyleSheet } from 'react-native'
import React from 'react'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

import Tachyons from 'react-native-style-tachyons'

import colors from '../../src/colors'
import Gauge from '../../src/components/gauge'

describe('Gauge', () => {
  Tachyons.build({ rem: 16 }, StyleSheet)

  const gui = { s: Tachyons.styles, c: colors, z: Tachyons.sizes }
  const measure = { value: 32, unit: 'metric' }

  test('renders correctly - nohero', () => {
    const tree = renderer.create(<Gauge gui={gui} measure={measure} caption="temperature" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('renders correctly - hero', () => {
    const tree = renderer.create(<Gauge gui={gui} measure={measure} caption="temperature" hero />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
