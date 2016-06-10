const { Strategy } = require('passport-jwt')

const { User } = require('../models')
const config = require('./main')

const cookieExtractor = req => {
  let token = null
  if (req && req.signedCookies) {
    token = req.signedCookies.access_token
  }
  return token
}

module.exports = passport => {
  passport.use(new Strategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: config.secret,
    passReqToCallback: false,
  }, ({ _doc: { _id } }, next) => {
    User.findOne({ _id }, (err, user) => {
      if (err) return next(err, false)
      if (!user) return next(null, false)
      return next(null, user)
    })
  }))
}
