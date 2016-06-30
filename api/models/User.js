const mongoose = require('mongoose')
const bcrypt = require('bcrypt-as-promised')

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
  }],
  drafts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Draft'
  }]
})

UserSchema.pre('save', function hashPassword(next) {
  const user = this

  if (this.isModified('password') || this.isNew) {
    return bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(this.password, salt))
      .then(hash => {
        user.password = hash
        return next()
      })
      .catch(err => next(err))
  }

  return next()
})

UserSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.password)
    .then(() => this)
    .catch(err => err)
}

module.exports = mongoose.model('User', UserSchema)
