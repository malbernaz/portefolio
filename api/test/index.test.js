const test = require('tape')

require('./drafts.test')
require('./posts.test')
require('./users.test')

test('SUMMARY', t => {
  t.end()
  process.exit(0)
})
