// @flow

import { sagas as env } from './modules/env'

// use them in parallel
const sagas = function* GSagas(): any {
  yield env.start
}

export default sagas
