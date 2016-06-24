const Express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookie = require('cookie-parser')
const morgan = require('morgan')
const passport = require('passport')

const config = require('./config/main')
const passportConfig = require('./config/passport')

const { User, Post, Draft } = require('./routes')

const api = new Express()
const port = 5000

api.use(bodyParser.urlencoded({ extended: false }))
api.use(bodyParser.json())
api.use(cookie(config.secret))

api.use(morgan('dev'))

api.use(passport.initialize())

mongoose.connect(config.database)

passportConfig(passport)

api.get('/', (req, res) => {
  res.send('portefolio !!!')
})

api.use('/user', User)
api.use('/posts', Post)
api.use('/drafts', Draft)

api.listen(port, err => {
  if (err) {
    console.log(err)
  }

  console.log(`==>  Api listening on port ${port}`)
})
