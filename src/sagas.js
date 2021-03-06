// @flow

import { sagas as env } from './modules/env'
import { sagas as model } from './modules/model'

// use them in parallel
const sagas = function* GSagas(): any {
  yield env.start
  yield env.lookup

  yield model.refreshAll
  yield model.refreshCity
  yield model.updateTime
}

export default sagas
