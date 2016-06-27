const mongoose = require('mongoose')

const { titleSlugger } = require('../helpers')

const PostSchema = new mongoose.Schema({
  raw: {
    type: String,
    required: true
  },
  html: {
    type: String
  },
  slug: {
    type: String,
    required: true
  },
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
      ref: 'User',
      required: true
    }
  }
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

PostSchema.pre('remove', function updatePosts(next) {
  this.model('User').update({
    $pull: { posts: this._id }
  }, next)
})

module.exports = mongoose.model('Post', PostSchema)
