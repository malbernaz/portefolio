import { Strategy } from 'passport-jwt'

import { User } from '../models'
import config from './main'

const cookieExtractor = req => req && req.signedCookies ?
  req.signedCookies.access_token : null

const strategyConfig = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: config.secret,
  passReqToCallback: false,
}

export default passport => {
  passport.use(new Strategy(strategyConfig, ({ _doc: { _id } }, next) => {
    User.findOne({ _id }, (err, user) => {
      if (err) return next(err, false)

      if (!user) return next(null, false)

      return next(null, user)
    })
  }))
}
