import supertest from 'supertest'

import api from '../src/server'
import User from '../src/models/User'
import Post from '../src/models/Post'
import Draft from '../src/models/Draft'
import config from '../src/config/main'

export const request = supertest(api)

export const createUser = next =>
  request.post('/api/user/register')
    .send({ username: 'Carlitos', email: 'carlitos@test.com', password: '123' })
    .set('Authorization', config.registrationSecret)
    .end((err, res) =>
      next(res.headers['set-cookie'], res.body.user))

export const createSecondUser = next =>
  request.post('/api/user/register')
    .send({ username: 'Anita', email: 'anita@test.com', password: '123' })
    .set('Authorization', config.registrationSecret)
    .end((err, res) =>
      next(res.headers['set-cookie'], res.body.user))

export const createLoginCookie = next =>
  request.post('/api/user/authenticate')
    .send({ email: 'carlitos@test.com', password: '123' })
    .end((err, res) =>
      next(res.headers['set-cookie'], res.body.user))

export const createSecondLoginCookie = next =>
  request.post('/api/user/authenticate')
    .send({ email: 'anita@test.com', password: '123' })
    .end((err, res) =>
      next(res.headers['set-cookie'], res.body.user))

export const genericErrorMessage =
  'something went wrong. consider sending an email to albernazmiguel@gmail.com'

export const fakeObjectId = '551137c2f9e1fac808a5f572'

export const populatePosts = (id, n) => {
  for (let i = 0; i < n; i += 1) {
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

export const populateDrafts = (id, n) => {
  for (let i = 0; i < n; i += 1) {
    const draft = new Draft({
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

    draft.save()
  }
}

export const getPosts = () => Post.find({}).exec()

export const genericPost = i => ({
  raw: `${i}`,
  html: `<p>${i}</p>`,
  slug: `title-${i}`,
  meta: {
    title: `Title ${i}`,
    description: `description ${i}`,
    tags: ['open source']
  }
})

export const destroyUsers = () => User.remove({}).exec()

export const destroyPosts = () => Post.remove({}).exec()

export const destroyDrafts = () => Draft.remove({}).exec()
