const mongoose = require('mongoose')

const { titleSlugger } = require('../helpers')

const DraftSchema = new mongoose.Schema({
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

DraftSchema.pre('save', function slugTitle(next) {
  const draft = this

  draft.slug = titleSlugger(draft.meta.title)

  draft.meta.tags = draft.meta.tags
    .filter((tag, i, array) => array.indexOf(tag) === i)

  return next()
})

DraftSchema.pre('remove', function updatePosts(next) {
  this.model('User').update({
    $pull: { drafts: this._id }
  }, next)
})

module.exports = mongoose.model('Draft', DraftSchema)
