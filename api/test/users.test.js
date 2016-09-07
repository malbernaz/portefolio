const test = require('tape')
const config = require('../config/main')
const { request, createLoginCookie, destroyUsers } = require('./helpers')

destroyUsers()

test('POST /api/user/register, attempt to register without token', t => {
  t.plan(3)

  request.post('/api/user/register')
    .send({})
    .expect(401)
    .end((err, res) => {
      const { success, message } = res.body

      t.error(err, 'no errors')
      t.deepEqual(success, false)
      t.deepEqual(message, 'you do not own permission to register to this site')
      t.end()
    })
})

test('POST /api/user/register, attempt to register with empty body', t => {
  t.plan(3)

  request.post('/api/user/register')
    .send({})
    .set('Authorization', config.registrationSecret)
    .expect(400)
    .end((err, res) => {
      const { success, message } = res.body

      t.error(err, 'no errors')
      t.deepEqual(success, false)
      t.deepEqual(message, 'please enter email and password')
      t.end()
    })
})

test('POST /api/user/register, successful user creation', t => {
  t.plan(6)

  request.post('/api/user/register')
    .send({ username: 'Carlitos', email: 'carlitos@test.com', password: '123' })
    .set('Authorization', config.registrationSecret)
    .expect(200)
    .end((err, res) => {
      const { user, success, message } = res.body

      t.error(err, 'no errors')
      t.deepEqual(success, true)
      t.deepEqual(message, 'successfully created new user')
      t.deepEqual(user.username, 'carlitos')
      t.deepEqual(user.email, 'carlitos@test.com')
      t.deepEqual(user.posts, [])
      t.end()
    })
})

test('POST /api/user/register, attempt to register with existing email', t => {
  t.plan(3)

  request.post('/api/user/register')
    .send({ username: 'carlitos', email: 'carlitos@test.com', password: '123' })
    .set('Authorization', config.registrationSecret)
    .expect(400)
    .end((err, res) => {
      const { success, message } = res.body

      t.error(err, 'no errors')
      t.deepEqual(success, false)
      t.deepEqual(message, 'that email address already exists')
      t.end()
    })
})

test('POST /api/user/authenticate, attempt to authenticate with bad credentials', t => {
  t.plan(3)

  request.post('/api/user/authenticate')
    .send({ email: 'carlitos@test.com', password: '321' })
    .expect(400)
    .end((err, res) => {
      const { success, message } = res.body

      t.error(err, 'no errors')
      t.deepEqual(success, false)
      t.deepEqual(message, 'email and password didn\'t match')
      t.end()
    })
})

test('POST /api/user/authenticate, successful attempt to authenticate', t => {
  t.plan(5)

  request.post('/api/user/authenticate')
    .send({ email: 'carlitos@test.com', password: '123' })
    .expect(200)
    .end((err, res) => {
      const { user, success, message } = res.body

      t.deepEqual(success, true)
      t.deepEqual(message, 'successfully authenticated user')
      t.deepEqual(user.username, 'carlitos')
      t.deepEqual(user.email, 'carlitos@test.com')
      t.deepEqual(user.posts, [])
      t.end()
    })
})

test('GET /api/user/loadauth, attempt to authenticate without token', t => {
  t.plan(1)

  request.get('/api/user/loadauth')
    .expect(401)
    .end(err => {
      t.error(err, 'no errors')
      t.end()
    })
})

test('GET /api/user/loadauth, successful attempt to load authentication', t => {
  t.plan(6)

  createLoginCookie(cookie => {
    request.get('/api/user/loadauth')
      .set('cookie', cookie)
      .expect(200)
      .end((err, res) => {
        const { user, success, message } = res.body

        t.error(err, 'no errors')
        t.deepEqual(success, true)
        t.deepEqual(message, 'successfully authenticated user')
        t.deepEqual(user.username, 'carlitos')
        t.deepEqual(user.email, 'carlitos@test.com')
        t.deepEqual(user.posts, [])
        t.end()
      })
  })
})

test('GET /api/user/logout, attempt to logout without token', t => {
  t.plan(1)

  request.get('/api/user/logout')
    .expect(401)
    .end(err => {
      t.error(err, 'no errors')
      t.end()
    })
})

test('GET /api/user/logout, successful attempt to logout', t => {
  t.plan(3)

  createLoginCookie(cookie =>
    request.get('/api/user/logout')
      .set('cookie', cookie)
      .expect(200)
      .end((err, res) => {
        const { success, message } = res.body

        t.error(err, 'no errors')
        t.deepEqual(success, true)
        t.deepEqual(message, 'successfully logged out user')
        t.end()
      }))
})
