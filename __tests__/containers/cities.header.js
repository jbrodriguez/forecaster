import { StyleSheet } from 'react-native'
import React from 'react'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

import Tachyons from 'react-native-style-tachyons'

import colors from '../../src/colors'
import { HeaderRightBase } from '../../src/containers/cities.header'

describe('CitiesHeader', () => {
  Tachyons.build({ rem: 16 }, StyleSheet)

  const gui = { s: Tachyons.styles, c: colors, z: Tachyons.sizes }
  const search = jest.fn()
  const settings = jest.fn()

  test('renders correctly - nohero', () => {
    const tree = renderer.create(<HeaderRightBase gui={gui} search={search} settings={settings} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
