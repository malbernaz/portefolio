const api = require('../server')
const User = require('../models/User')
const Post = require('../models/Post')
const Draft = require('../models/Draft')
const config = require('../config/main')

const request = require('supertest')(api)

const createUser = next =>
  request.post('/api/user/register')
    .send({ username: 'Carlitos', email: 'carlitos@test.com', password: '123' })
    .set('Authorization', config.registrationSecret)
    .end((err, res) =>
      next(res.headers['set-cookie'], res.body.user))

const createSecondUser = next =>
  request.post('/api/user/register')
    .send({ username: 'Anita', email: 'anita@test.com', password: '123' })
    .set('Authorization', config.registrationSecret)
    .end((err, res) =>
      next(res.headers['set-cookie'], res.body.user))

const createLoginCookie = next =>
  request.post('/api/user/authenticate')
    .send({ email: 'carlitos@test.com', password: '123' })
    .end((err, res) =>
      next(res.headers['set-cookie'], res.body.user))

const createSecondLoginCookie = next =>
  request.post('/api/user/authenticate')
    .send({ email: 'anita@test.com', password: '123' })
    .end((err, res) =>
      next(res.headers['set-cookie'], res.body.user))

const genericErrorMessage =
  'something went wrong. consider sending an email to albernazmiguel@gmail.com'

const populatePosts = (id, n) => {
  for (let i = 0; i < n; i++) {
    const post = new Post({
      raw: `${i}`,
      html: `<p>${i}</p>`,
      slug: `title-${i}`,
      meta: {
        title: `Title ${i}`,
        description: `description ${i}`,
        tags: ['open source'],
        author: id
      }
    })

    post.save()
  }
}

const genericPost = (i) => ({
  raw: `${i}`,
  html: `<p>${i}</p>`,
  slug: `title-${i}`,
  meta: {
    title: `Title ${i}`,
    description: `description ${i}`,
    tags: ['open source']
  }
})

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

const destroyUsers = () => User.remove({}).exec()

const destroyPosts = () => Post.remove({}).exec()

const destroyDrafts = () => Draft.remove({}).exec()

module.exports = {
  createLoginCookie,
  createSecondLoginCookie,
  createSecondUser,
  createUser,
  destroyDrafts,
  destroyPosts,
  destroyUsers,
  genericErrorMessage,
  genericPost,
  populateDrafts,
  populatePosts,
  request
}
