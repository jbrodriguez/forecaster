// @flow

import { sagas as env } from './modules/env'

// use them in parallel
const sagas = function* GSagas(): any {
  yield env.start
  yield env.lookup
}

export default sagas
