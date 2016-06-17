const mongoose = require('mongoose')

const { titleSlugger } = require('../helpers')

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  subtitle: {
    type: String,
    lowercase: true,
    required: true
  },
  tags: [{
    type: String,
    lowercase: true
  }],
  body: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  slug: {
    type: String,
    required: true
  },
}, {
  timestamps: true
})

PostSchema.pre('save', function slugTitle(next) {
  const post = this

  post.slug = titleSlugger(this.slug)

  return next()
})

module.exports = mongoose.model('Post', PostSchema)
