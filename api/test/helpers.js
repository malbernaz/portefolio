const api = require('../server')
const User = require('../models/User')
const Post = require('../models/Post')
const Draft = require('../models/Draft')

const request = require('supertest')(api)

const createUser = next =>
  request.post('/api/user/register')
    .send({ email: 'carlitos@test.com', password: '123' })
    .end((err, res) =>
      next({ cookie: res.headers['set-cookie'], user: res.body.user }))

const createLoginCookie = next =>
  request.post('/api/user/authenticate')
    .send({ email: 'carlitos@test.com', password: '123' })
    .end((err, res) => next(res.headers['set-cookie']))

const genericErrorMessage =
  'something went wrong. consider sending an email to albernazmiguel@gmail.com'

const populatePosts = (_id, n) => {
  for (let i = 0; i < n; i++) {
    const post = new Post({
      raw: `${i}`,
      html: `<p>${i}</p>`,
      slug: `title-${i}`,
      meta: {
        title: `Title ${i}`,
        description: `description ${i}`,
        tags: ['open source'],
        author: _id
      }
    })

    post.save()
  }
}

const populateDrafts = (_id, n) => {
  for (let i = 0; i < n; i++) {
    const draft = new Draft({
      raw: `${i}`,
      html: `<p>${i}</p>`,
      slug: `title-${i}`,
      meta: {
        title: `Title ${i}`,
        description: `description ${i}`,
        tags: ['open source'],
        author: _id
      }
    })

    draft.save()
  }
}

const destroyUsers = () => User.remove({}).exec().then

const destroyPosts = () => Post.remove({}).exec().then

const destroyDrafts = () => Draft.remove({}).exec().then

module.exports = {
  request,
  createUser,
  createLoginCookie,
  genericErrorMessage,
  populatePosts,
  populateDrafts,
  destroyUsers,
  destroyPosts,
  destroyDrafts
}
