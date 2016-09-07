const test = require('tape')
const { request, createLoginCookie } = require('./helpers')

test('POST /api/posts, get posts', t => {
  t.plan(3)

  request.get('/api/posts')
    .expect(200)
    .end((err, res) => {
      const { success, message } = res.body

      t.error(err, 'no errors')
      t.deepEqual(success, true)
      t.deepEqual(message, 'you do not own permission to register to this site')
      t.end()
    })
})
