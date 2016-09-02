import test from 'tape'

import { SHOW_MESSAGE, DISSMISS_MESSAGE } from '../constants'
import { showMessage, dissmissMessage } from './message'

test('message action: showMessage', t => {
  const message = 'a message'

  t.plan(1)
  t.deepEqual(showMessage(message), { type: SHOW_MESSAGE, message })
})

test('message action: dissmissMessage', t => {
  t.plan(1)
  t.deepEqual(dissmissMessage(), { type: DISSMISS_MESSAGE })
})
