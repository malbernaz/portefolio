const { sign } = require('jsonwebtoken')
const passport = require('passport')

const { User } = require('../models')
const config = require('../config/main')

const Router = new require('express').Router() //  eslint-disable-line new-cap

Router.post('/register', (req, res) => {
  const { username, email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      status: {
        success: false,
        message: 'Please enter email and password'
      }
    })
  }
  const user = new User({
    username,
    email,
    password
  })
  return user.save(err => {
    if (err) {
      console.log(err.toJSON())
      return res.status(400).json({
        status: {
          success: false,
          message: 'that email address already exists'
        }
      })
    }
    const token = sign(user, config.secret, {
      expiresIn: 604800
    })
    return res.cookie('access_token', token, {
      maxAge: 604800 * 1000,
      secure: req.protocol === 'https',
      httpOnly: true,
      signed: true
    }).json({
      status: {
        success: true,
        message: 'successfully created new user'
      },
      user
    })
  })
})

Router.post('/authenticate', (req, res) => {
  const { email, password } = req.body
  User.findOne({ email }, (foErr, user) => {
    if (foErr) {
      console.log(foErr.toJSON())
      throw foErr
    }
    if (!user) {
      return res.status(400).json({
        status: {
          success: false,
          message: 'authentication failed. User not found'
        }
      })
    }
    return user.comparePassword(password, (pwErr, isMatch) => {
      if (foErr) {
        console.log(foErr.toJSON())
        throw foErr
      }
      if (isMatch) {
        const token = sign(user, config.secret, {
          expiresIn: 604800
        })
        return res.cookie('access_token', token, {
          maxAge: 604800 * 1000,
          secure: req.protocol === 'https',
          httpOnly: true,
          signed: true
        }).json({
          status: {
            success: true,
            message: 'successfully authenticated user'
          },
          user
        })
      }
      return res.status(400).json({
        status: {
          success: false,
          message: 'authentication failed. Passwords did not match'
        }
      })
    })
  })
})

Router.get('/loadauth', passport.authenticate('jwt', {
  session: false
}), ({ user }, res) => {
  res.json({
    status: {
      success: true,
      message: 'successfully authenticated user'
    },
    user
  })
})

Router.get('/logout', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.clearCookie('access_token').json({
    status: {
      success: true,
      message: 'successfully logged out user'
    }
  })
})

module.exports = Router
