const mongoose = require('mongoose')

const { titleSlugger } = require('../helpers')

const PostSchema = new mongoose.Schema({
  meta: {
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
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  raw: {
    type: String,
    required: true
  },
  html: {
    type: String,
    required: true,
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

  post.slug = titleSlugger(post.meta.title)

  post.meta.tags = post.meta.tags
    .filter((tag, i, array) => array.indexOf(tag) === i)

  return next()
})

module.exports = mongoose.model('Post', PostSchema)
