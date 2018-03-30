import { Text } from 'react-native'
import React from 'react'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

import Touchable from '../../src/components/touchable'

test('Touchable renders correctly', () => {
  const goTo = jest.fn()

  const tree = renderer
    .create(
      <Touchable goTo={goTo} disabled={false}>
        <Text>touchable test</Text>
      </Touchable>,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
