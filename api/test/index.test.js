import test from 'tape'

import './drafts.test'
import './posts.test'
import './users.test'

test('SUMMARY', t => {
  t.end()
  process.exit(0)
})
