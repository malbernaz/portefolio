import Express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookie from 'cookie-parser'
import morgan from 'morgan'
import passport from 'passport'

import config from './config/main'
import passportConfig from './config/passport'

import PostsModel from './models/Post'
import DraftsModel from './models/Draft'

import { User, Post, Draft } from './routes'

const api = new Express()

// Use native promises with mongoose
mongoose.Promise = global.Promise

api.use(bodyParser.urlencoded({ extended: false }))
api.use(bodyParser.json())
api.use(cookie(config.secret))

if (process.env.NODE_ENV !== 'production') {
  api.use(morgan('dev'))
}

api.use(passport.initialize())

mongoose.connect(config.database)

passportConfig(passport)

api.use('/api/user', User)
api.use('/api/posts', Post)
api.use('/api/drafts', Draft)

api.get('/api/postsanddrafts', passport.authenticate('jwt', {
  session: false
}), ({ user }, res) => {
  const queries = [
    PostsModel.find({ 'meta.author': user._id }).exec().then(result => ({ posts: result })),
    DraftsModel.find({ 'meta.author': user._id }).exec().then(result => ({ drafts: result }))
  ]

  return Promise.all(queries)
    .then(result => {
      let response = {
        success: true,
        message: 'successfully loaded posts and drafts',
      }

      result.forEach(r => { response = { ...response, ...r } })

      return res.send(response)
    })

    .catch(() => res.status(400).send({
      success: false,
      message: 'something went wrong. could not load posts and drafts'
    }))
})

export default api
