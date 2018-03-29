// @flow

import { sagas as env } from './modules/env'
import { sagas as model } from './modules/model'

// use them in parallel
const sagas = function* GSagas(): any {
  yield env.start
  yield env.lookup

  yield model.refreshAll
}

export default sagas
