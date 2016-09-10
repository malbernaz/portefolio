const test = require('tape')
const {
  request,
  createUser,
  populatePosts,
  destroyPosts,
  destroyUsers,
  destroyDrafts,
  createLoginCookie,
  genericPost,
  createSecondUser,
  createSecondLoginCookie
} = require('./helpers')

test('BEFORE POSTS TEST', t => {
  destroyPosts()
    .then(destroyUsers())
    .then(destroyDrafts())
    .then(createUser((cookie, { id }) => {
      populatePosts(id, 10)
      t.end()
    }))
})

let userPosts
test('GET /api/posts, get posts', t => {
  t.plan(3)

  request.get('/api/posts')
    .expect(200)
    .end((err, res) => {
      const { success, message, posts } = res.body

      userPosts = posts

      t.error(err, 'no errors')
      t.deepEqual(success, true)
      t.deepEqual(message, 'successfully loaded posts')
      t.end()
    })
})

test('GET /api/posts/:slug, get post by slug', t => {
  t.plan(4)

  request.get('/api/posts/title-1')
    .expect(200)
    .end((err, res) => {
      const { success, message, post } = res.body

      t.error(err, 'no errors')
      t.deepEqual(success, true)
      t.deepEqual(post.meta.title, 'Title 1')
      t.deepEqual(message, 'successfully loaded post')
      t.end()
    })
})

test('GET /api/posts/:slug, unsuccessful try to get post by slug', t => {
  t.plan(3)

  request.get('/api/posts/foo')
    .expect(404)
    .end((err, res) => {
      const { success, message } = res.body

      t.error(err, 'no errors')
      t.deepEqual(success, false)
      t.deepEqual(message, 'this post does not exist')
      t.end()
    })
})

test('POST /api/posts, unsuccessful try to create post unauthenticated', t => {
  t.plan(1)

  request.post('/api/posts')
    .expect(401)
    .end((err) => {
      t.error(err, 'no errors')
      t.end()
    })
})

let postID
test('POST /api/posts, successful try to create post', t => {
  t.plan(8)

  createLoginCookie((cookie, user) =>
    request.post('/api/posts')
      .send(genericPost(17))
      .set('cookie', cookie)
      .expect(200)
      .end((err, res) => {
        const { success, message, post } = res.body

        postID = post._id

        t.error(err, 'no errors')
        t.deepEqual(success, true)
        t.deepEqual(post.slug, 'title-17')
        t.deepEqual(post.meta.title, 'Title 17')
        t.deepEqual(post.meta.author, user.id)
        t.deepEqual(typeof post.raw, 'string')
        t.deepEqual(typeof post.html, 'string')
        t.deepEqual(message, 'successfully created post')
        t.end()
      }))
})

test('POST /api/posts, unsuccessful try to create post with existent title', t => {
  t.plan(3)

  createLoginCookie((cookie, user) =>
    request.post('/api/posts')
      .send(genericPost(17, user.id))
      .set('cookie', cookie)
      .expect(400)
      .end((err, res) => {
        const { success, message } = res.body

        t.error(err, 'no errors')
        t.deepEqual(success, false)
        t.deepEqual(message, 'could not create post. existent title')
        t.end()
      }))
})

test('PATCH /api/posts/:_id, unsuccessful try to update inexistent post', t => {
  t.plan(3)

  createLoginCookie(cookie =>
    request.patch('/api/posts/123')
      .send({})
      .set('cookie', cookie)
      .expect(404)
      .end((err, res) => {
        const { success, message } = res.body

        t.error(err, 'no errors')
        t.deepEqual(success, false)
        t.deepEqual(message, 'could not update post. inexsistent')
        t.end()
      }))
})

test('PATCH /api/posts/:_id, unsuccessful try to update another users post', t => {
  t.plan(3)

  createSecondUser(cookie =>
    request.patch(`/api/posts/${postID}`)
      .send({})
      .set('cookie', cookie)
      .expect(401)
      .end((err, res) => {
        const { success, message } = res.body

        t.error(err, 'no errors')
        t.deepEqual(success, false)
        t.deepEqual(message, 'you do not own this post')
        t.end()
      }))
})

test('PATCH /api/posts/:_id, successful try to update post', t => {
  t.plan(5)

  createLoginCookie(cookie =>
    request.patch(`/api/posts/${postID}`)
      .send({ meta: { title: 'Other Title' } })
      .set('cookie', cookie)
      .expect(200)
      .end((err, res) => {
        const { success, message, post } = res.body

        t.error(err, 'no errors')
        t.deepEqual(success, true)
        t.deepEqual(post.slug, 'other-title')
        t.deepEqual(post.meta.title, 'Other Title')
        t.deepEqual(message, 'successfully updated post')
        t.end()
      }))
})

test('DELETE /api/posts/:_id, unsuccessful try to delete other users post', t => {
  t.plan(3)

  createSecondLoginCookie(cookie =>
    request.delete(`/api/posts/${postID}`)
      .set('cookie', cookie)
      .expect(401)
      .end((err, res) => {
        const { success, message } = res.body

        t.error(err, 'no errors')
        t.deepEqual(success, false)
        t.deepEqual(message, 'you do not own this post')
        t.end()
      }))
})

test('DELETE /api/posts/:_id, unsuccessful try to delete inexsistent post', t => {
  t.plan(3)

  createLoginCookie(cookie =>
    request.delete('/api/posts/123')
      .set('cookie', cookie)
      .expect(404)
      .end((err, res) => {
        const { success, message } = res.body

        t.error(err, 'no errors')
        t.deepEqual(success, false)
        t.deepEqual(message, 'could not delete post. inexsistent')
        t.end()
      }))
})

test('DELETE /api/posts/:_id, successful try to delete post', t => {
  t.plan(6)

  createLoginCookie(cookie =>
    request.delete(`/api/posts/${postID}`)
      .set('cookie', cookie)
      .expect(200)
      .end((err, res) => {
        const { success, message, post } = res.body

        t.error(err, 'no errors')
        t.deepEqual(success, true)
        t.deepEqual(message, 'successfully deleted post')
        t.deepEqual(post._id, postID)
        t.deepEqual(post.slug, 'other-title')
        t.deepEqual(post.meta.title, 'Other Title')
        t.end()
      }))
})

test('PUT /api/posts/unpublish/:_id, unsuccessful try to unpublish other users post', t => {
  t.plan(3)

  createSecondLoginCookie(cookie =>
    request.put(`/api/posts/unpublish/${userPosts[0]._id}`)
      .send({ meta: { title: 'Other Title' } })
      .set('cookie', cookie)
      .expect(401)
      .end((err, res) => {
        const { success, message } = res.body

        t.error(err, 'no errors')
        t.deepEqual(success, false)
        t.deepEqual(message, 'you do not own this post')
        t.end()
      }))
})

test('PUT /api/posts/unpublish/:_id, unsuccessful try to unpublish inexsistent post', t => {
  t.plan(3)

  createLoginCookie(cookie =>
    request.put('/api/posts/unpublish/123')
      .send({ meta: { title: 'Other Title' } })
      .set('cookie', cookie)
      .expect(404)
      .end((err, res) => {
        const { success, message } = res.body

        t.error(err, 'no errors')
        t.deepEqual(success, false)
        t.deepEqual(message, 'could not unpublish post. inexsistent')
        t.end()
      }))
})

test('PUT /api/posts/unpublish/:_id, successful try to unpublish post', t => {
  t.plan(6)

  createLoginCookie(cookie =>
    request.put(`/api/posts/unpublish/${userPosts[0]._id}`)
      .send({ meta: { title: 'Another Title' } })
      .set('cookie', cookie)
      .expect(200)
      .end((err, res) => {
        const { success, message, draft } = res.body

        t.error(err, 'no errors')
        t.deepEqual(success, true)
        t.deepEqual(message, 'successfully unpublished post')
        t.deepEqual(draft._id, userPosts[0]._id)
        t.deepEqual(draft.slug, 'another-title')
        t.deepEqual(draft.meta.title, 'Another Title')
        t.end()
      }))
})
