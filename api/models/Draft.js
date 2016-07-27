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
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  },
  meta: {
    title: {
      type: String,
      required: true,
      lowercase: true
    },
    description: {
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
})

DraftSchema.pre('save', function (next) {
  const draft = this

  return this.model('User').update({
    $push: { drafts: this._id }
  }, () => {
    draft.slug = titleSlugger(draft.meta.title)

    draft.meta.tags = draft.meta.tags.filter((tag, i, array) => array.indexOf(tag) === i)

    return next()
  })
})

DraftSchema.pre('remove', function (next) {
  return this.model('User').update({ $pull: { drafts: this._id } }, next)
})

module.exports = mongoose.model('Draft', DraftSchema)
