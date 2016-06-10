const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]
})

UserSchema.pre('save', function hashPassword(next) {
  const user = this
  if (this.isModified('password') || this.isNew) {
    return bcrypt.genSalt(10, (saltErr, salt) => {
      if (saltErr) return next(saltErr)
      return bcrypt.hash(this.password, salt, (hashErr, hash) => {
        if (hashErr) return next(hashErr)
        user.password = hash
        return next()
      })
    })
  }
  return next()
})

UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return callback(err)
    return callback(null, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema)
