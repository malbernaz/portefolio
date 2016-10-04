import test from 'tape'

import { TOGGLE_NAV } from '../../constants'
import { toggleNav } from './nav'

test('ui/nav action: toggleNav', t => {
  t.plan(1)
  t.deepEqual(toggleNav(), { type: TOGGLE_NAV })
})
