const Express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookie = require('cookie-parser')
const morgan = require('morgan')
const passport = require('passport')

const config = require('./config/main')
const passportConfig = require('./config/passport')

const PostsModel = require('./models/Post')
const DraftsModel = require('./models/Draft')

const { User, Post, Draft } = require('./routes')

const api = new Express()

// Use native promises with mongoose
mongoose.Promise = global.Promise

api.use(bodyParser.urlencoded({ extended: false }))
api.use(bodyParser.json())
api.use(cookie(config.secret))

api.use(morgan('dev'))

api.use(passport.initialize())

mongoose.connect(config.database)

passportConfig(passport)

api.use('/user', User)
api.use('/posts', Post)
api.use('/drafts', Draft)

api.get('/postsanddrafts', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const queries = [
    PostsModel.find().exec()
      .then(result => ({ posts: result }))
      .catch(err => err),
    DraftsModel.find().exec()
      .then(result => ({ drafts: result }))
      .catch(err => err)
  ]

  return Promise.all(queries)
    .then(result => res.send(Object.assign({
      success: true,
      message: 'successfully loaded posts and drafts'
    }, Object.assign(result[0], result[1]))))
    .catch(err => res.status(400).send({
      success: false,
      message: 'something went wrong. could\'t load posts and drafts',
      err
    }))
})

api.listen(config.port, err => {
  if (err) {
    console.log(err) // eslint-disable-line no-console
  }

  console.log(`\n==>  Api listening on port ${config.port}\n`) // eslint-disable-line no-console
})
