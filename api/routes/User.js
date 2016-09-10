const express = require('express')
const { sign } = require('jsonwebtoken')
const passport = require('passport')

const { User } = require('../models')
const config = require('../config/main')

const Router = new express.Router()

Router.post('/register', (req, res) => {
  const { username, email, password } = req.body
  const { authorization } = req.headers

  if (authorization !== config.registrationSecret) {
    return res.status(401).json({
      success: false,
      message: 'you do not own permission to register to this site'
    })
  }

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'please enter email and password'
    })
  }

  const user = new User({ username, email, password })

  return user.save(err => {
    if (err) {
      console.log(err) // eslint-disable-line no-console

      return res.status(400).json({
        success: false,
        message: 'that email address already exists'
      })
    }

    const token = sign(user, config.secret, { expiresIn: 604800 })

    return res.cookie('access_token', token, {
      maxAge: 604800 * 1000,
      secure: req.protocol === 'https',
      httpOnly: true,
      signed: true
    }).json({
      success: true,
      message: 'successfully created new user',
      user: {
        username: user.username,
        email: user.email,
        posts: user.posts,
        id: user._id
      }
    })
  })
})

Router.post('/authenticate', (req, res) => {
  const { email, password } = req.body

  User.findOne({ email }).exec()

  // compare passwords
  .then(user => user.comparePassword(password))

  // send ok response
  .then(user => {
    const token = sign(user, config.secret, { expiresIn: 604800 })

    return res.cookie('access_token', token, {
      maxAge: 604800 * 1000,
      secure: req.protocol === 'https',
      httpOnly: true,
      signed: true
    }).json({
      success: true,
      message: 'successfully authenticated user',
      user: {
        username: user.username,
        email: user.email,
        posts: user.posts,
        id: user._id
      }
    })
  })

  // catch any error
  .catch(err => {
    console.log(err) // eslint-disable-line no-console

    return res.status(400).json({
      success: false,
      message: 'email and password didn\'t match'
    })
  })
})

Router.get('/loadauth', passport.authenticate('jwt', {
  session: false
}), ({ user }, res) => {
  res.json({
    success: true,
    message: 'successfully authenticated user',
    user: {
      username: user.username,
      email: user.email,
      posts: user.posts,
      id: user._id
    }
  })
})

Router.get('/logout', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.clearCookie('access_token').json({
    success: true,
    message: 'successfully logged out user'
  })
})

module.exports = Router
