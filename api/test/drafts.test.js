import test from 'tape'
import {
  createLoginCookie,
  createSecondLoginCookie,
  createSecondUser,
  createUser,
  destroyDrafts,
  destroyPosts,
  destroyUsers,
  genericPost,
  populateDrafts,
  request,
  fakeObjectId
} from './helpers'

test('BEFORE DRAFTS TEST', t => {
  destroyPosts()
    .then(destroyUsers)
    .then(destroyDrafts)
    .then(createUser((cookie, { id }) => {
      populateDrafts(id, 10)
      t.end()
    }))
})

let usersDrafts
test('GET /api/drafts successful try to get drafts', t => {
  t.plan(4)

  createLoginCookie(cookie => {
    request.get('/api/drafts')
      .set('cookie', cookie)
      .expect(200)
      .end((err, res) => {
        const { success, message, drafts } = res.body

        usersDrafts = drafts

        t.error(err, 'no error')
        t.deepEqual(success, true)
        t.deepEqual(message, 'successfully loaded drafts')
        t.deepEqual(drafts.length, 10)
        t.end()
      })
  })
})

test('GET /api/drafts should return only the drafts from the original owner', t => {
  t.plan(4)

  createSecondUser(cookie => {
    request.get('/api/drafts')
      .set('cookie', cookie)
      .expect(200)
      .end((err, res) => {
        const { success, message, drafts } = res.body

        t.error(err, 'no error')
        t.deepEqual(success, true)
        t.deepEqual(message, 'successfully loaded drafts')
        t.deepEqual(drafts.length, 0)
        t.end()
      })
  })
})

test('GET /api/drafts/:slug successful try to get draft by slug', t => {
  t.plan(3)

  createLoginCookie(cookie => {
    request.get(`/api/drafts/${usersDrafts[0]._id}`)
      .set('cookie', cookie)
      .expect(200)
      .end((err, res) => {
        const { success, message } = res.body

        t.error(err, 'no error')
        t.deepEqual(success, true)
        t.deepEqual(message, 'successfully loaded draft')
        t.end()
      })
  })
})

test('GET /api/drafts/:_id unsuccessful try to get inexistent draft', t => {
  t.plan(3)

  createSecondLoginCookie(cookie => {
    request.get(`/api/drafts/${usersDrafts[0]._id}`)
      .set('cookie', cookie)
      .expect(404)
      .end((err, res) => {
        const { success, message } = res.body

        t.error(err, 'no error')
        t.deepEqual(success, false)
        t.deepEqual(message, 'this draft does not exist')
        t.end()
      })
  })
})

test('POST /api/drafts/:_id successful try to create draft', t => {
  t.plan(5)

  createLoginCookie((cookie, user) => {
    request.post('/api/drafts')
      .send(genericPost(17))
      .set('cookie', cookie)
      .expect(200)
      .end((err, res) => {
        const { success, message, draft } = res.body

        t.error(err, 'no error')
        t.deepEqual(success, true)
        t.deepEqual(message, 'successfully created draft')
        t.deepEqual(draft.meta.title, 'Title 17')
        t.deepEqual(draft.meta.author, user.id)
        t.end()
      })
  })
})

test('PATCH /api/drafts/:_id unsuccessful try to update inexistent draft', t => {
  t.plan(3)

  createLoginCookie(cookie => {
    request.patch(`/api/drafts/${fakeObjectId}`)
      .send({})
      .set('cookie', cookie)
      .expect(404)
      .end((err, res) => {
        const { success, message } = res.body

        t.error(err, 'no error')
        t.deepEqual(success, false)
        t.deepEqual(message, 'could not update draft. inexistent')
        t.end()
      })
  })
})

test('PATCH /api/drafts/:_id successful try to update draft', t => {
  t.plan(5)

  createLoginCookie((cookie, user) => {
    request.patch(`/api/drafts/${usersDrafts[0]._id}`)
      .send({ meta: { title: 'Another Title' } })
      .set('cookie', cookie)
      .expect(200)
      .end((err, res) => {
        const { success, message, draft } = res.body

        t.error(err, 'no error')
        t.deepEqual(success, true)
        t.deepEqual(message, 'successfully updated draft')
        t.deepEqual(draft.meta.title, 'Another Title')
        t.deepEqual(draft.meta.author, user.id)
        t.end()
      })
  })
})

test('DELETE /api/drafts/:_id unsuccessful try to delete inexistent draft', t => {
  t.plan(3)

  createLoginCookie(cookie => {
    request.delete(`/api/drafts/${fakeObjectId}`)
      .set('cookie', cookie)
      .expect(404)
      .end((err, res) => {
        const { success, message } = res.body

        t.error(err, 'no error')
        t.deepEqual(success, false)
        t.deepEqual(message, 'could not delete draft. inexistent')
        t.end()
      })
  })
})

test('DELETE /api/drafts/:_id successful try to delete draft', t => {
  t.plan(4)

  createLoginCookie((cookie, user) => {
    request.delete(`/api/drafts/${usersDrafts[0]._id}`)
      .set('cookie', cookie)
      .expect(200)
      .end((err, res) => {
        const { success, message, draft } = res.body

        t.error(err, 'no error')
        t.deepEqual(success, true)
        t.deepEqual(message, 'successfully deleted draft')
        t.deepEqual(draft.meta.author, user.id)
        t.end()
      })
  })
})
