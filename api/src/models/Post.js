import mongoose from 'mongoose'

import titleSlugger from '../helpers'

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
    lowercase: true
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
      unique: true
    },
    description: {
      type: String,
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

PostSchema.pre('save', function (next) {
  const post = this

  return this.model('User').update({ $push: { posts: this._id } }, () => {
    post.slug = titleSlugger(post.meta.title)

    post.meta.tags = post.meta.tags.filter((tag, i, array) => array.indexOf(tag) === i)

    return next()
  })
})

PostSchema.pre('remove', function (next) {
  return this.model('User').update({ $pull: { posts: this._id } }, next)
})

export default mongoose.model('Post', PostSchema)
